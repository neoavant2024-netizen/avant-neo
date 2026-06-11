<?php
// お問合せフォーム送信処理（エックスサーバー / PHP）
// フロント（/contact）から JSON を POST で受け取り、info@avant-neo.jp へ送信する。

header('Content-Type: application/json; charset=utf-8');

// 同一オリジン運用のため CORS は基本不要。プリフライト対策のみ最小限。
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'method_not_allowed']);
    exit;
}

// 入力取得（JSON / フォーム両対応）
$raw = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!is_array($data)) {
    $data = $_POST;
}

$name    = trim($data['name'] ?? '');
$email   = trim($data['email'] ?? '');
$subject = trim($data['subject'] ?? '');
$message = trim($data['message'] ?? '');

// 必須チェック
if ($name === '' || $email === '' || $subject === '') {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'required']);
    exit;
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'invalid_email']);
    exit;
}

// 簡易スパム対策（任意の honeypot フィールド）
if (!empty($data['company_url'] ?? '')) {
    echo json_encode(['ok' => true]); // ボットには成功を装って破棄
    exit;
}

// ヘッダインジェクション対策（改行除去）
$clean = function ($s) {
    return str_replace(["\r", "\n"], ' ', $s);
};

mb_language('Japanese');
mb_internal_encoding('UTF-8');

$to          = 'info@avant-neo.jp';
$mailSubject = '【お問合せ】' . $clean($subject);
$body =
    "コーポレートサイトのお問合せフォームより送信されました。\n" .
    "----------------------------------------\n" .
    "お名前：{$name}\n" .
    "メール：{$email}\n" .
    "題名　：{$subject}\n" .
    "----------------------------------------\n\n" .
    ($message !== '' ? $message : '(本文なし)') . "\n";

// 送信元はドメインのアドレスにし、返信先を入力者にする
$from    = 'no-reply@avant-neo.jp';
$headers = 'From: ' . mb_encode_mimeheader($clean($name)) . " <{$from}>\r\n";
$headers .= 'Reply-To: ' . $clean($email);

$ok = mb_send_mail($to, $mailSubject, $body, $headers);

if ($ok) {
    echo json_encode(['ok' => true]);
} else {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'send_failed']);
}
