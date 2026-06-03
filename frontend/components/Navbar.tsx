"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getUser, logout } from "../lib/api";
import { Activity, LogOut, User, Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [user, setUserData] = useState<any>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setUserData(getUser());
    setIsMobileMenuOpen(false); // Close mobile menu on page transition
  }, [pathname]);

  if (pathname.startsWith("/auth")) return null; // Sembunyikan navbar di halaman auth

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-zinc-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-teal-600 font-bold text-xl shrink-0">
            <Activity className="h-6 w-6" />
            <span>MedPlatform</span>
          </Link>

          {/* Desktop Nav Links & Auth */}
          <div className="hidden md:flex items-center gap-6">
            {(!user || user.role === "PASIEN") && (
              <Link href="/" className="text-zinc-600 hover:text-teal-600 font-medium text-sm transition-colors">
                Cari Dokter
              </Link>
            )}
            
            {user ? (
              <>
                {user.role === "PASIEN" && (
                  <>
                    <Link href="/apotek" className="text-zinc-600 hover:text-teal-600 font-medium text-sm transition-colors">
                      Apotek
                    </Link>
                    <Link href="/dashboard/pasien" className="text-zinc-600 hover:text-teal-600 font-medium text-sm transition-colors">
                      Dashboard Saya
                    </Link>
                  </>
                )}
                {user.role === "DOKTER" && (
                  <Link href="/dashboard/dokter" className="text-zinc-600 hover:text-teal-600 font-medium text-sm transition-colors">
                    Panel Dokter
                  </Link>
                )}
                <div className="flex items-center gap-4 pl-4 border-l border-zinc-200">
                  <span className="flex items-center gap-2 text-sm font-medium text-zinc-900">
                    <User className="h-4 w-4 shrink-0" />
                    <span className="max-w-[150px] truncate">{user.nama}</span>
                    <span className="text-xs text-zinc-400">({user.role})</span>
                  </span>
                  <button
                    onClick={logout}
                    className="flex items-center gap-1 text-sm font-medium text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-md transition-colors shrink-0"
                  >
                    <LogOut className="h-4 w-4" />
                    Keluar
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3 pl-4 border-l border-zinc-200">
                <Link
                  href="/auth/login"
                  className="text-teal-600 hover:text-teal-700 font-medium text-sm px-3 py-2 transition-colors"
                >
                  Masuk
                </Link>
                <Link
                  href="/auth/register"
                  className="bg-teal-600 hover:bg-teal-700 text-white font-medium text-sm px-4 py-2 rounded-md shadow-sm transition-colors"
                >
                  Daftar
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-zinc-500 hover:text-teal-600 hover:bg-zinc-100 transition-colors"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Links Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-zinc-200 px-4 py-4 space-y-3 shadow-inner">
          <div className="flex flex-col gap-3">
            {(!user || user.role === "PASIEN") && (
              <Link
                href="/"
                className="text-zinc-600 hover:text-teal-600 font-medium text-sm py-2 px-3 hover:bg-zinc-50 rounded-lg transition-all"
              >
                Cari Dokter
              </Link>
            )}

            {user ? (
              <>
                {user.role === "PASIEN" && (
                  <>
                    <Link
                      href="/apotek"
                      className="text-zinc-600 hover:text-teal-600 font-medium text-sm py-2 px-3 hover:bg-zinc-50 rounded-lg transition-all"
                    >
                      Apotek
                    </Link>
                    <Link
                      href="/dashboard/pasien"
                      className="text-zinc-600 hover:text-teal-600 font-medium text-sm py-2 px-3 hover:bg-zinc-50 rounded-lg transition-all"
                    >
                      Dashboard Saya
                    </Link>
                  </>
                )}
                {user.role === "DOKTER" && (
                  <Link
                    href="/dashboard/dokter"
                    className="text-zinc-600 hover:text-teal-600 font-medium text-sm py-2 px-3 hover:bg-zinc-50 rounded-lg transition-all"
                  >
                    Panel Dokter
                  </Link>
                )}
                
                {/* User info on mobile */}
                <div className="border-t border-zinc-100 pt-3 mt-1 px-3 flex flex-col gap-3">
                  <span className="flex items-center gap-2 text-sm font-medium text-zinc-900">
                    <User className="h-4 w-4 shrink-0 text-zinc-500" />
                    <span>{user.nama} ({user.role})</span>
                  </span>
                  <button
                    onClick={logout}
                    className="flex items-center justify-center gap-2 w-full text-sm font-medium text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 py-2.5 rounded-lg transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    Keluar
                  </button>
                </div>
              </>
            ) : (
              <div className="border-t border-zinc-100 pt-3 mt-1 px-3 flex flex-col gap-2">
                <Link
                  href="/auth/login"
                  className="flex items-center justify-center text-teal-600 hover:text-teal-700 font-medium text-sm py-2.5 rounded-lg border border-teal-200 transition-colors"
                >
                  Masuk
                </Link>
                <Link
                  href="/auth/register"
                  className="flex items-center justify-center bg-teal-600 hover:bg-teal-700 text-white font-medium text-sm py-2.5 rounded-lg shadow-sm transition-colors"
                >
                  Daftar
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
