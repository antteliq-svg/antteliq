import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "クラブ診断 | あなたに合うゴルフクラブがわかる",
  description: "3〜5分の質問に答えるだけで、AIがあなたに最適なゴルフクラブを診断します。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
