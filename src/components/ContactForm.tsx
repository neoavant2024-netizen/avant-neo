"use client";

import { useState } from "react";
import { site, contactAccessKey } from "@/lib/site";

type Fields = { name: string; email: string; subject: string; message: string };
type Status = "idle" | "sending" | "sent" | "error";

const field =
  "w-full rounded-xl border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg-soft)_80%,transparent)] px-4 py-3.5 text-sm outline-none transition-colors placeholder:text-[var(--color-fg-dim)] focus:border-[var(--color-cyan)]";

export default function ContactForm() {
  const [f, setF] = useState<Fields>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [botcheck, setBotcheck] = useState(false); // honeypot
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const set =
    (k: keyof Fields) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setF((prev) => ({ ...prev, [k]: e.target.value }));

  const mailtoFallback = () => {
    const body = `お名前：${f.name}\nメール：${f.email}\n\n${f.message}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      f.subject
    )}&body=${encodeURIComponent(body)}`;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!f.name.trim() || !f.email.trim() || !f.subject.trim()) {
      setError("氏名・メールアドレス・題名は必須です。");
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.email)) {
      setError("メールアドレスの形式をご確認ください。");
      return;
    }
    setError("");
    setStatus("sending");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: contactAccessKey,
          subject: `【お問合せ】${f.subject}`,
          from_name: "アヴァント コーポレートサイト",
          name: f.name,
          email: f.email,
          message: f.message || "(本文なし)",
          botcheck, // honeypot（true ならスパムとして拒否）
        }),
      });
      const json = await res.json().catch(() => null);
      if (res.ok && json?.success) {
        setStatus("sent");
      } else {
        setStatus("error");
        setError(
          json?.message
            ? `送信に失敗しました（${json.message}）。`
            : "送信に失敗しました。お手数ですが下記の方法をお試しください。"
        );
      }
    } catch {
      setStatus("error");
      setError(
        "送信サーバーに接続できませんでした。お手数ですが下記の方法をお試しください。"
      );
    }
  };

  if (status === "sent") {
    return (
      <div className="hero-fade rounded-2xl border border-[color-mix(in_srgb,var(--color-cyan)_30%,var(--color-border))] bg-[color-mix(in_srgb,var(--color-surface)_50%,transparent)] px-8 py-12 text-center backdrop-blur-md">
        <div className="text-gradient-sweep glow-gradient mx-auto text-4xl font-bold">
          ✓
        </div>
        <h3 className="mt-4 text-xl font-bold">送信が完了しました</h3>
        <p className="mt-3 text-sm leading-7 text-[var(--color-fg-muted)]">
          お問合せいただきありがとうございます。
          <br />
          内容を確認のうえ、担当者よりご連絡いたします。
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm">
            氏名 <span className="text-[var(--color-cyan)]">*</span>
          </span>
          <input
            className={field}
            value={f.name}
            onChange={set("name")}
            placeholder="山田 太郎"
            autoComplete="name"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm">
            メールアドレス <span className="text-[var(--color-cyan)]">*</span>
          </span>
          <input
            className={field}
            value={f.email}
            onChange={set("email")}
            placeholder="you@example.com"
            inputMode="email"
            autoComplete="email"
          />
        </label>
      </div>

      <label className="block">
        <span className="mb-2 block text-sm">
          題名 <span className="text-[var(--color-cyan)]">*</span>
        </span>
        <input
          className={field}
          value={f.subject}
          onChange={set("subject")}
          placeholder="お問合せの件名"
        />
      </label>

      <label className="block">
        <span className="mb-2 block text-sm">
          メッセージ本文{" "}
          <span className="text-[var(--color-fg-muted)]">(任意)</span>
        </span>
        <textarea
          className={`${field} min-h-40 resize-y`}
          value={f.message}
          onChange={set("message")}
          placeholder="ご相談内容をご記入ください。"
        />
      </label>

      {/* honeypot（人間には非表示） */}
      <input
        type="checkbox"
        tabIndex={-1}
        autoComplete="off"
        checked={botcheck}
        onChange={(e) => setBotcheck(e.target.checked)}
        className="hidden"
        aria-hidden
      />

      {error && (
        <div className="text-sm text-[var(--color-magenta)]">
          {error}
          {status === "error" && (
            <button
              type="button"
              onClick={mailtoFallback}
              className="ml-2 underline hover:text-[var(--color-cyan)]"
            >
              メールソフトで送る
            </button>
          )}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-full bg-[var(--color-fg)] px-8 py-4 text-sm font-semibold text-[#04060f] transition-all hover:shadow-[0_0_40px_-8px_var(--color-cyan)] active:scale-[0.98] disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" ? "送信中…" : "この内容で送信する"}
      </button>

      <p className="text-xs leading-6 text-[var(--color-fg-muted)]">
        ※ 送信内容は {site.email} 宛に送信されます。
      </p>
    </form>
  );
}
