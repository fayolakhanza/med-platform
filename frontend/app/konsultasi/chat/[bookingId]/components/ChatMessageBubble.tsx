"use client";
// MedPlatform Chat Room Component - Ver 1.0.2

import { Button } from "../../../../../components/ui/button";
import { FileText, CheckCircle2, Stethoscope, User } from "lucide-react";

interface ChatMessageBubbleProps {
  chat: any;
  currentUserId: number | undefined;
  userRole: string | undefined;
  onOpenCheckout: (resepData: any) => void;
}

export default function ChatMessageBubble({ chat, currentUserId, userRole, onOpenCheckout }: ChatMessageBubbleProps) {
  const messageText = chat.message || chat.pesan || "";
  const senderRole = chat.senderRole || chat.sender?.role || (Number(chat.senderId) === Number(currentUserId) ? userRole : (userRole === 'DOKTER' ? 'PASIEN' : 'DOKTER'));
  const isMe = senderRole === userRole;
  const lawanBicaraLabel = senderRole;

  // ===== Render: Resep Digital =====
  if (messageText.startsWith("[RESEP]: ")) {
    try {
      const resepData = JSON.parse(messageText.replace("[RESEP]: ", ""));
      const totalHarga = resepData.items.reduce((sum: number, item: any) => sum + (item.harga * item.jumlah), 0);
      
      return (
        <div className="w-full flex justify-center my-5">
          <div className="bg-white/90 backdrop-blur-xl border border-teal-200 rounded-3xl p-5 shadow-lg shadow-teal-900/5 w-[92%] max-w-sm">
            <div className="flex items-center gap-2 text-teal-700 font-bold mb-4 pb-3 border-b border-teal-100">
              <div className="w-8 h-8 rounded-xl bg-teal-50 flex items-center justify-center">
                <FileText className="w-4 h-4 text-teal-600" />
              </div>
              Resep Digital Dokter
            </div>
            <ul className="space-y-2.5 mb-4 text-sm text-zinc-600">
              {resepData.items.map((item: any, idx: number) => (
                <li key={idx} className="flex justify-between items-center bg-zinc-50 rounded-xl px-3 py-2">
                  <span className="font-medium">{item.jumlah}x {item.nama}</span>
                  <span className="text-teal-700 font-semibold">Rp {(item.harga * item.jumlah).toLocaleString('id-ID')}</span>
                </li>
              ))}
            </ul>
            <div className="flex justify-between font-bold text-zinc-800 border-t pt-3 border-zinc-100 mb-4">
              <span>Total Tagihan</span>
              <span className="text-teal-700 text-lg">Rp {totalHarga.toLocaleString('id-ID')}</span>
            </div>
            
            {userRole === 'PASIEN' ? (
              <Button 
                onClick={() => onOpenCheckout(resepData)} 
                className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 rounded-xl shadow-md shadow-teal-600/20"
              >
                Tebus Resep & Bayar Sekarang
              </Button>
            ) : (
              <p className="text-xs text-center text-zinc-400 bg-zinc-50 py-2.5 rounded-xl">Menunggu pasien menebus resep...</p>
            )}
          </div>
        </div>
      );
    } catch (e) {
      // Fallback if parse fails
    }
  }

  // ===== Render: Notifikasi Sistem =====
  if (messageText.startsWith("[SISTEM]: ")) {
    return (
      <div className="w-full flex justify-center my-4">
        <span className="bg-teal-50 text-teal-700 text-xs py-1.5 px-4 rounded-full border border-teal-100 flex items-center gap-1.5 shadow-sm">
          <CheckCircle2 className="w-3.5 h-3.5" />
          {messageText.replace("[SISTEM]: ", "")}
        </span>
      </div>
    );
  }

  // ===== Render: Chat Normal =====
  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"} mb-3 gap-2 items-end`}>
      {/* Avatar lawan bicara (ditampilkan di kiri) */}
      {!isMe && (
        <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-md ${
          userRole === 'PASIEN'
            ? "bg-gradient-to-br from-teal-500 to-emerald-600 shadow-teal-500/30 text-white"
            : "bg-zinc-200 text-zinc-500 shadow-zinc-200/30"
        }`}>
          {userRole === 'PASIEN' ? (
            <Stethoscope className="w-4 h-4" />
          ) : (
            <User className="w-4 h-4" />
          )}
        </div>
      )}

      <div className={`max-w-[72%] rounded-2xl px-4 py-3 shadow-sm ${
        isMe
          ? "bg-gradient-to-br from-teal-500 to-emerald-600 text-white rounded-br-md shadow-md shadow-teal-500/20"
          : "bg-white border border-zinc-200 text-zinc-800 rounded-bl-md"
      }`}>
        {isMe ? (
          <p className="text-[10px] font-semibold text-teal-100 mb-1 tracking-wide uppercase">
            Anda
          </p>
        ) : (
          <p className="text-[10px] font-semibold text-zinc-400 mb-1 tracking-wide uppercase">
            {lawanBicaraLabel}
          </p>
        )}
        <p className="text-sm leading-relaxed">{messageText}</p>
        <p className={`text-[10px] mt-1.5 text-right ${isMe ? "text-teal-100" : "text-zinc-400"}`}>
          {new Date(chat.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>

      {/* Avatar kita sendiri (ditampilkan di kanan) */}
      {isMe && (
        <div className="w-8 h-8 rounded-xl bg-zinc-200 flex items-center justify-center shrink-0 text-zinc-500">
          {userRole === 'DOKTER' ? (
            <Stethoscope className="w-4 h-4" />
          ) : (
            <User className="w-4 h-4" />
          )}
        </div>
      )}
    </div>
  );
}

