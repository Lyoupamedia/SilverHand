import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import {
  ChevronLeft,
  Store,
  Settings,
  Bell,
  DollarSign,
  TrendingUp,
  ShoppingBag,
  Copy,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  X,
  Link2,
  CheckCircle2,
  Share2,
  Clock,
  BarChart3,
  Eye,
  EyeOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const merchantTransactions = [
  { id: 1, customer: "Walk-in #1042", amount: 12.50, time: "5 min ago", method: "QR Scan" },
  { id: 2, customer: "Online Order #389", amount: 45.00, time: "22 min ago", method: "Payment Link" },
  { id: 3, customer: "Walk-in #1041", amount: 8.75, time: "1 hr ago", method: "QR Scan" },
  { id: 4, customer: "API Checkout", amount: 129.99, time: "2 hrs ago", method: "API" },
  { id: 5, customer: "Walk-in #1040", amount: 22.30, time: "3 hrs ago", method: "QR Scan" },
  { id: 6, customer: "Online Order #388", amount: 67.50, time: "5 hrs ago", method: "Payment Link" },
];

const paymentLinks = [
  { id: 1, name: "Coffee Menu", amount: null, uses: 142, active: true },
  { id: 2, name: "Lunch Special", amount: 15.99, uses: 38, active: true },
  { id: 3, name: "Gift Card $50", amount: 50.00, uses: 12, active: false },
];

type ModalType = "none" | "create-link" | "qr-checkout" | "link-detail";

export default function MerchantDashboard() {
  const navigate = useNavigate();
  const [showRevenue, setShowRevenue] = useState(true);
  const [activeModal, setActiveModal] = useState<ModalType>("none");
  const [newLinkName, setNewLinkName] = useState("");
  const [newLinkAmount, setNewLinkAmount] = useState("");
  const [qrAmount, setQrAmount] = useState("");
  const [qrGenerated, setQrGenerated] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedLink, setSelectedLink] = useState<typeof paymentLinks[0] | null>(null);
  const [activeTab, setActiveTab] = useState<"transactions" | "links">("transactions");

  const todayRevenue = 286.04;
  const weekRevenue = 1843.27;
  const totalTransactions = 47;
  const merchantAddress = "7xKpR9vNqWmT5bLcA8dFz2eYhJ4uK3mVq";

  const handleCopy = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openModal = (type: ModalType) => {
    setActiveModal(type);
    setNewLinkName("");
    setNewLinkAmount("");
    setQrAmount("");
    setQrGenerated(false);
    setSelectedLink(null);
  };

  const handleCreateLink = () => {
    // Simulate link creation
    setActiveModal("none");
  };

  const handleGenerateQR = () => {
    setQrGenerated(true);
  };

  const openLinkDetail = (link: typeof paymentLinks[0]) => {
    setSelectedLink(link);
    setActiveModal("link-detail");
  };

  const qrValue = qrAmount
    ? `solana:${merchantAddress}?amount=${qrAmount}&spl-token=USDC&label=SilverHand+Merchant`
    : `solana:${merchantAddress}?spl-token=USDC&label=SilverHand+Merchant`;

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      {/* Top Bar */}
      <header className="fixed top-0 w-full z-50 glass-strong">
        <div className="container mx-auto flex items-center justify-between py-3 px-6">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="text-sm">Wallet</span>
          </button>
          <div className="flex items-center gap-2">
            <Store className="h-4 w-4 text-glow" />
            <span className="font-display font-semibold">Merchant Mode</span>
          </div>
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
        {/* Revenue Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl glass-strong p-6 glow-border"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-muted-foreground">Today's Revenue</span>
            <button
              onClick={() => setShowRevenue(!showRevenue)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {showRevenue ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            </button>
          </div>
          <div className="mb-4">
            <span className="font-display text-4xl font-bold">
              {showRevenue
                ? `$${todayRevenue.toLocaleString("en-US", { minimumFractionDigits: 2 })}`
                : "••••••"}
            </span>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: TrendingUp, label: "This Week", value: `$${weekRevenue.toLocaleString("en-US", { minimumFractionDigits: 2 })}` },
              { icon: ShoppingBag, label: "Transactions", value: totalTransactions.toString() },
              { icon: DollarSign, label: "Avg. Sale", value: `$${(todayRevenue / 8).toFixed(2)}` },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl bg-accent/30 p-3 text-center">
                <stat.icon className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                <p className="font-display font-bold text-sm">
                  {showRevenue ? stat.value : "••"}
                </p>
                <p className="text-[10px] text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 gap-3"
        >
          <button
            onClick={() => openModal("qr-checkout")}
            className="flex flex-col items-center gap-2 p-4 rounded-xl bg-glow/15 hover:bg-glow/25 transition-colors"
          >
            <BarChart3 className="h-5 w-5" />
            <span className="text-xs font-medium">Quick Checkout</span>
          </button>
          <button
            onClick={() => openModal("create-link")}
            className="flex flex-col items-center gap-2 p-4 rounded-xl bg-success/15 hover:bg-success/25 transition-colors"
          >
            <Link2 className="h-5 w-5" />
            <span className="text-xs font-medium">New Payment Link</span>
          </button>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex gap-1 p-1 rounded-xl glass mb-4">
            {(["transactions", "links"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? "bg-accent text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab === "transactions" ? "Transactions" : "Payment Links"}
              </button>
            ))}
          </div>

          {/* Transactions List */}
          {activeTab === "transactions" && (
            <div className="space-y-2">
              {merchantTransactions.map((tx, i) => (
                <motion.div
                  key={tx.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + i * 0.05 }}
                  className="flex items-center gap-3 p-3 rounded-xl glass hover:bg-accent/20 transition-colors"
                >
                  <div className="h-9 w-9 rounded-full bg-success/10 flex items-center justify-center">
                    <ArrowDownLeft className="h-4 w-4 text-success" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">{tx.customer}</div>
                    <div className="text-xs text-muted-foreground">
                      {tx.method} · {tx.time}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-display font-semibold text-sm text-success">
                      +${tx.amount.toFixed(2)}
                    </div>
                    <div className="text-[10px] text-muted-foreground">
                      -${(tx.amount * 0.003).toFixed(2)} fee
                    </div>
                  </div>
                </motion.div>
              ))}
              <button className="w-full text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center gap-1 py-3">
                <Clock className="h-3 w-3" /> View All Transactions
              </button>
            </div>
          )}

          {/* Payment Links List */}
          {activeTab === "links" && (
            <div className="space-y-2">
              {paymentLinks.map((link, i) => (
                <motion.div
                  key={link.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + i * 0.05 }}
                  onClick={() => openLinkDetail(link)}
                  className="flex items-center gap-3 p-3 rounded-xl glass hover:bg-accent/20 transition-colors cursor-pointer"
                >
                  <div className="h-9 w-9 rounded-full bg-glow/10 flex items-center justify-center">
                    <Link2 className="h-4 w-4 text-glow" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">{link.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {link.amount ? `$${link.amount.toFixed(2)}` : "Any amount"} · {link.uses} uses
                    </div>
                  </div>
                  <div className={`text-xs px-2 py-0.5 rounded-full ${
                    link.active
                      ? "bg-success/15 text-success"
                      : "bg-muted text-muted-foreground"
                  }`}>
                    {link.active ? "Active" : "Paused"}
                  </div>
                </motion.div>
              ))}
              <Button
                variant="outline"
                className="w-full gap-2"
                onClick={() => openModal("create-link")}
              >
                <Plus className="h-4 w-4" /> Create Payment Link
              </Button>
            </div>
          )}
        </motion.div>

        {/* Fee Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="rounded-xl glass p-4 text-center"
        >
          <p className="text-xs text-muted-foreground">
            Flat <span className="text-foreground font-semibold">0.3%</span> fee per transaction · Instant settlement in USDC
          </p>
        </motion.div>
      </main>

      {/* Modals */}
      <AnimatePresence>
        {activeModal !== "none" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-sm flex items-end md:items-center justify-center"
            onClick={() => setActiveModal("none")}
          >
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md glass-strong rounded-t-2xl md:rounded-2xl p-6 glow-border"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display font-bold text-lg">
                  {activeModal === "qr-checkout" && "Quick Checkout"}
                  {activeModal === "create-link" && "Create Payment Link"}
                  {activeModal === "link-detail" && selectedLink?.name}
                </h2>
                <button
                  onClick={() => setActiveModal("none")}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Quick Checkout Modal */}
              {activeModal === "qr-checkout" && (
                <div className="space-y-6">
                  {!qrGenerated ? (
                    <>
                      <div>
                        <label className="text-xs text-muted-foreground mb-2 block">
                          Charge Amount (USDC)
                        </label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <input
                            type="number"
                            placeholder="0.00"
                            value={qrAmount}
                            onChange={(e) => setQrAmount(e.target.value)}
                            className="w-full pl-9 pr-4 py-3 rounded-xl bg-accent/30 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-glow/50 font-mono text-lg"
                          />
                        </div>
                      </div>
                      <Button
                        className="w-full"
                        size="lg"
                        disabled={!qrAmount || parseFloat(qrAmount) <= 0}
                        onClick={handleGenerateQR}
                      >
                        Generate QR Code
                      </Button>
                    </>
                  ) : (
                    <>
                      <div className="flex flex-col items-center gap-4">
                        <div className="p-4 rounded-2xl bg-foreground">
                          <QRCodeSVG
                            value={qrValue}
                            size={200}
                            bgColor="hsl(215, 20%, 92%)"
                            fgColor="hsl(225, 25%, 6%)"
                            level="H"
                          />
                        </div>
                        <div className="text-center">
                          <p className="font-display font-bold text-2xl">
                            ${parseFloat(qrAmount).toFixed(2)}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Customer scans to pay · Fee: ${(parseFloat(qrAmount) * 0.003).toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={() => setQrGenerated(false)}
                        >
                          New Amount
                        </Button>
                        <Button
                          className="flex-1 gap-2"
                          onClick={() => handleCopy(qrValue)}
                        >
                          <Share2 className="h-4 w-4" /> Share
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Create Payment Link Modal */}
              {activeModal === "create-link" && (
                <div className="space-y-5">
                  <div>
                    <label className="text-xs text-muted-foreground mb-2 block">Link Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Coffee Menu, Donation"
                      value={newLinkName}
                      onChange={(e) => setNewLinkName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-accent/30 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-glow/50 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-2 block">
                      Fixed Amount (optional — leave empty for any amount)
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        type="number"
                        placeholder="0.00"
                        value={newLinkAmount}
                        onChange={(e) => setNewLinkAmount(e.target.value)}
                        className="w-full pl-9 pr-4 py-3 rounded-xl bg-accent/30 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-glow/50 font-mono text-lg"
                      />
                    </div>
                  </div>
                  <Button
                    className="w-full gap-2"
                    size="lg"
                    disabled={!newLinkName.trim()}
                    onClick={handleCreateLink}
                  >
                    <CheckCircle2 className="h-4 w-4" /> Create Link
                  </Button>
                </div>
              )}

              {/* Link Detail Modal */}
              {activeModal === "link-detail" && selectedLink && (
                <div className="space-y-6">
                  <div className="flex flex-col items-center gap-4">
                    <div className="p-4 rounded-2xl bg-foreground">
                      <QRCodeSVG
                        value={`https://pay.silverhand.io/${selectedLink.name.toLowerCase().replace(/\s/g, "-")}`}
                        size={180}
                        bgColor="hsl(215, 20%, 92%)"
                        fgColor="hsl(225, 25%, 6%)"
                        level="H"
                      />
                    </div>
                    <div className="text-center">
                      <p className="font-display font-semibold">
                        {selectedLink.amount ? `$${selectedLink.amount.toFixed(2)}` : "Any amount"}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {selectedLink.uses} payments received
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-3 rounded-xl bg-accent/30">
                    <span className="text-xs font-mono text-muted-foreground flex-1 truncate">
                      pay.silverhand.io/{selectedLink.name.toLowerCase().replace(/\s/g, "-")}
                    </span>
                    <button
                      onClick={() =>
                        handleCopy(
                          `https://pay.silverhand.io/${selectedLink.name.toLowerCase().replace(/\s/g, "-")}`
                        )
                      }
                      className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>

                  <AnimatePresence>
                    {copied && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-xs text-success text-center"
                      >
                        Copied to clipboard!
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <Button className="w-full gap-2" size="lg" onClick={() => handleCopy(
                    `https://pay.silverhand.io/${selectedLink.name.toLowerCase().replace(/\s/g, "-")}`
                  )}>
                    <Share2 className="h-4 w-4" /> Share Link
                  </Button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
