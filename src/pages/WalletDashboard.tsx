import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
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
  X,
  Camera,
  Share2,
  CheckCircle2,
  DollarSign,
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

type ModalType = "none" | "receive" | "scan" | "send" | "scan-result";

export default function WalletDashboard() {
  const navigate = useNavigate();
  const [showBalance, setShowBalance] = useState(true);
  const [copied, setCopied] = useState(false);
  const [activeModal, setActiveModal] = useState<ModalType>("none");
  const [receiveAmount, setReceiveAmount] = useState("");
  const [sendAddress, setSendAddress] = useState("");
  const [sendAmount, setSendAmount] = useState("");
  const [scanResult, setScanResult] = useState("");
  const [sendStep, setSendStep] = useState<"input" | "confirm" | "success">("input");

  const walletAddress = "7xKpR9vNqWmT5bLcA8dFz2eYhJ4uK3mVq";
  const walletAddressShort = "7xKp...3mVq";
  const balance = 2847.53;

  const handleCopy = () => {
    navigator.clipboard?.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const qrValue = receiveAmount
    ? `solana:${walletAddress}?amount=${receiveAmount}&spl-token=USDC`
    : `solana:${walletAddress}`;

  const openModal = (type: ModalType) => {
    setActiveModal(type);
    setReceiveAmount("");
    setSendAddress("");
    setSendAmount("");
    setSendStep("input");
    setScanResult("");
  };

  const handleScanSimulate = () => {
    // Simulate scanning a QR code
    const simulatedAddress = "BxYk...9pRt";
    setScanResult(simulatedAddress);
    setActiveModal("scan-result");
  };

  const handleSendConfirm = () => {
    setSendStep("confirm");
  };

  const handleSendExecute = () => {
    setSendStep("success");
    setTimeout(() => {
      setActiveModal("none");
      setSendStep("input");
    }, 2500);
  };

  const handlePayScanned = () => {
    setSendAddress(scanResult);
    setActiveModal("send");
    setSendStep("input");
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
            <span className="text-xs text-muted-foreground font-mono flex-1">{walletAddressShort}</span>
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
            { icon: Send, label: "Send", color: "bg-glow/15 hover:bg-glow/25", action: () => openModal("send") },
            { icon: ArrowDownLeft, label: "Receive", color: "bg-success/15 hover:bg-success/25", action: () => openModal("receive") },
            { icon: QrCode, label: "Scan", color: "bg-accent hover:bg-accent/80", action: () => openModal("scan") },
          ].map((a) => (
            <button
              key={a.label}
              onClick={a.action}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl ${a.color} transition-colors`}
            >
              <a.icon className="h-5 w-5" />
              <span className="text-xs font-medium">{a.label}</span>
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
          onClick={() => navigate("/merchant")}
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
              {/* Close button */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display font-bold text-lg">
                  {activeModal === "receive" && "Receive Payment"}
                  {activeModal === "scan" && "Scan to Pay"}
                  {activeModal === "scan-result" && "Payment Found"}
                  {activeModal === "send" && (
                    sendStep === "success" ? "Payment Sent!" :
                    sendStep === "confirm" ? "Confirm Payment" : "Send Payment"
                  )}
                </h2>
                <button onClick={() => setActiveModal("none")} className="text-muted-foreground hover:text-foreground transition-colors">
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Receive Modal */}
              {activeModal === "receive" && (
                <div className="space-y-6">
                  {/* Amount input */}
                  <div>
                    <label className="text-xs text-muted-foreground mb-2 block">Request Amount (optional)</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        type="number"
                        placeholder="0.00"
                        value={receiveAmount}
                        onChange={(e) => setReceiveAmount(e.target.value)}
                        className="w-full pl-9 pr-4 py-3 rounded-xl bg-accent/30 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-glow/50 font-mono text-lg"
                      />
                    </div>
                  </div>

                  {/* QR Code */}
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
                    <p className="text-xs text-muted-foreground text-center max-w-xs">
                      {receiveAmount
                        ? `Request for $${receiveAmount} USDC`
                        : "Share this QR code to receive USDC payments"}
                    </p>
                  </div>

                  {/* Address + actions */}
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-accent/30">
                    <span className="text-xs font-mono text-muted-foreground flex-1 truncate">{walletAddress}</span>
                    <button onClick={handleCopy} className="text-muted-foreground hover:text-foreground transition-colors shrink-0">
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>

                  <Button className="w-full gap-2" size="lg" onClick={handleCopy}>
                    <Share2 className="h-4 w-4" /> Share Payment Link
                  </Button>
                </div>
              )}

              {/* Scan Modal */}
              {activeModal === "scan" && (
                <div className="space-y-6">
                  {/* Simulated camera view */}
                  <div className="relative aspect-square rounded-2xl bg-charcoal overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-8 border-2 border-glow/40 rounded-xl" />
                    <div className="absolute top-8 left-8 w-6 h-6 border-t-2 border-l-2 border-glow rounded-tl-lg" />
                    <div className="absolute top-8 right-8 w-6 h-6 border-t-2 border-r-2 border-glow rounded-tr-lg" />
                    <div className="absolute bottom-8 left-8 w-6 h-6 border-b-2 border-l-2 border-glow rounded-bl-lg" />
                    <div className="absolute bottom-8 right-8 w-6 h-6 border-b-2 border-r-2 border-glow rounded-br-lg" />
                    {/* Scan line animation */}
                    <motion.div
                      className="absolute left-8 right-8 h-0.5 bg-glow/60"
                      animate={{ y: [-100, 100] }}
                      transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                    />
                    <Camera className="h-8 w-8 text-muted-foreground/30" />
                  </div>
                  <p className="text-xs text-muted-foreground text-center">
                    Point your camera at a SilverHand QR code to pay
                  </p>
                  <Button className="w-full" size="lg" onClick={handleScanSimulate}>
                    Simulate Scan
                  </Button>
                </div>
              )}

              {/* Scan Result Modal */}
              {activeModal === "scan-result" && (
                <div className="space-y-6">
                  <div className="text-center space-y-3">
                    <div className="mx-auto h-16 w-16 rounded-full bg-success/15 flex items-center justify-center">
                      <CheckCircle2 className="h-8 w-8 text-success" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Recipient Found</p>
                      <p className="font-mono text-sm font-medium mt-1">{scanResult}</p>
                    </div>
                  </div>
                  <Button className="w-full" size="lg" onClick={handlePayScanned}>
                    Pay This Address
                  </Button>
                </div>
              )}

              {/* Send Modal */}
              {activeModal === "send" && (
                <>
                  {sendStep === "input" && (
                    <div className="space-y-5">
                      <div>
                        <label className="text-xs text-muted-foreground mb-2 block">Recipient Address</label>
                        <input
                          type="text"
                          placeholder="Enter Solana address"
                          value={sendAddress}
                          onChange={(e) => setSendAddress(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-accent/30 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-glow/50 font-mono text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground mb-2 block">Amount (USDC)</label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <input
                            type="number"
                            placeholder="0.00"
                            value={sendAmount}
                            onChange={(e) => setSendAmount(e.target.value)}
                            className="w-full pl-9 pr-4 py-3 rounded-xl bg-accent/30 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-glow/50 font-mono text-lg"
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1.5">
                          Available: ${balance.toLocaleString("en-US", { minimumFractionDigits: 2 })} USDC
                        </p>
                      </div>
                      <Button
                        className="w-full"
                        size="lg"
                        disabled={!sendAddress || !sendAmount || parseFloat(sendAmount) <= 0}
                        onClick={handleSendConfirm}
                      >
                        Continue
                      </Button>
                    </div>
                  )}

                  {sendStep === "confirm" && (
                    <div className="space-y-6">
                      <div className="rounded-xl bg-accent/20 p-4 space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">To</span>
                          <span className="font-mono">{sendAddress.length > 12 ? sendAddress.slice(0, 6) + "..." + sendAddress.slice(-4) : sendAddress}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Amount</span>
                          <span className="font-display font-bold">${parseFloat(sendAmount).toFixed(2)} USDC</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Network Fee</span>
                          <span className="text-success">~$0.0001</span>
                        </div>
                        <div className="border-t border-border/30 pt-3 flex justify-between text-sm">
                          <span className="text-muted-foreground">Total</span>
                          <span className="font-display font-bold">${(parseFloat(sendAmount) + 0.0001).toFixed(4)} USDC</span>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Button variant="outline" className="flex-1" onClick={() => setSendStep("input")}>
                          Back
                        </Button>
                        <Button className="flex-1" onClick={handleSendExecute}>
                          Confirm & Send
                        </Button>
                      </div>
                    </div>
                  )}

                  {sendStep === "success" && (
                    <div className="text-center space-y-4 py-4">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", damping: 10, stiffness: 200 }}
                        className="mx-auto h-20 w-20 rounded-full bg-success/15 flex items-center justify-center"
                      >
                        <CheckCircle2 className="h-10 w-10 text-success" />
                      </motion.div>
                      <div>
                        <p className="font-display font-bold text-2xl">${parseFloat(sendAmount).toFixed(2)}</p>
                        <p className="text-sm text-muted-foreground mt-1">Sent successfully</p>
                      </div>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 2.2, ease: "linear" }}
                        className="h-0.5 bg-success/30 rounded-full"
                      />
                    </div>
                  )}
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
