import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  ArrowDownLeft,
  QrCode,
  Copy,
  Eye,
  EyeOff,
  Send,
  Clock,
  ChevronLeft,
  Store,
  Settings,
  Bell,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const transactions = [
  { id: 1, type: "sent", to: "Coffee Shop", amount: -4.50, time: "2 min ago", status: "confirmed" },
  { id: 2, type: "received", to: "Alice.sol", amount: 250.00, time: "1 hr ago", status: "confirmed" },
  { id: 3, type: "sent", to: "Grocery Store", amount: -32.15, time: "3 hrs ago", status: "confirmed" },
  { id: 4, type: "sent", to: "Subscription", amount: -12.99, time: "Yesterday", status: "confirmed" },
  { id: 5, type: "received", to: "Bob.sol", amount: 100.00, time: "Yesterday", status: "confirmed" },
];

export default function WalletDashboard() {
  const navigate = useNavigate();
  const [showBalance, setShowBalance] = useState(true);
  const [copied, setCopied] = useState(false);
  const walletAddress = "7xKp...3mVq";
  const balance = 2847.53;

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      {/* Top Bar */}
      <header className="fixed top-0 w-full z-50 glass-strong">
        <div className="container mx-auto flex items-center justify-between py-3 px-6">
          <button onClick={() => navigate("/")} className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
            <ChevronLeft className="h-4 w-4" />
            <div className="h-7 w-7 rounded-md gradient-silver" />
          </button>
          <span className="font-display font-semibold">Wallet</span>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="pt-20 pb-8 px-4 max-w-lg mx-auto space-y-6">
        {/* Balance Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl glass-strong p-6 glow-border"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-muted-foreground">Total Balance</span>
            <button onClick={() => setShowBalance(!showBalance)} className="text-muted-foreground hover:text-foreground transition-colors">
              {showBalance ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            </button>
          </div>
          <div className="mb-1">
            <span className="font-display text-4xl font-bold">
              {showBalance ? `$${balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}` : "••••••"}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <span className="text-success text-xs font-medium">USDC</span>
            <span>on Solana</span>
          </div>

          {/* Wallet Address */}
          <div className="flex items-center gap-2 p-2.5 rounded-lg bg-accent/30">
            <span className="text-xs text-muted-foreground font-mono flex-1">{walletAddress}</span>
            <button onClick={handleCopy} className="text-muted-foreground hover:text-foreground transition-colors">
              <Copy className="h-3.5 w-3.5" />
            </button>
            <AnimatePresence>
              {copied && (
                <motion.span
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-xs text-success"
                >
                  Copied!
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-3"
        >
          {[
            { icon: Send, label: "Send", color: "bg-glow/15 hover:bg-glow/25" },
            { icon: ArrowDownLeft, label: "Receive", color: "bg-success/15 hover:bg-success/25" },
            { icon: QrCode, label: "Scan", color: "bg-accent hover:bg-accent/80" },
          ].map((action) => (
            <button
              key={action.label}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl ${action.color} transition-colors`}
            >
              <action.icon className="h-5 w-5" />
              <span className="text-xs font-medium">{action.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Transactions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold">Recent Transactions</h2>
            <button className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
              <Clock className="h-3 w-3" /> View All
            </button>
          </div>
          <div className="space-y-2">
            {transactions.map((tx, i) => (
              <motion.div
                key={tx.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 + i * 0.05 }}
                className="flex items-center gap-3 p-3 rounded-xl glass hover:bg-accent/20 transition-colors cursor-pointer"
              >
                <div className={`h-9 w-9 rounded-full flex items-center justify-center ${
                  tx.type === "sent" ? "bg-glow/10" : "bg-success/10"
                }`}>
                  {tx.type === "sent" ? (
                    <ArrowUpRight className="h-4 w-4 text-glow" />
                  ) : (
                    <ArrowDownLeft className="h-4 w-4 text-success" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm truncate">{tx.to}</div>
                  <div className="text-xs text-muted-foreground">{tx.time}</div>
                </div>
                <div className={`font-display font-semibold text-sm ${
                  tx.amount > 0 ? "text-success" : ""
                }`}>
                  {tx.amount > 0 ? "+" : ""}${Math.abs(tx.amount).toFixed(2)}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Merchant Mode Teaser */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-xl glass p-5 flex items-center gap-4 cursor-pointer hover:glow-border transition-all"
        >
          <div className="h-10 w-10 rounded-lg bg-accent flex items-center justify-center shrink-0">
            <Store className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h3 className="font-display font-semibold text-sm">Merchant Mode</h3>
            <p className="text-xs text-muted-foreground">Accept stablecoin payments for your business</p>
          </div>
          <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
        </motion.div>
      </main>
    </div>
  );
}
