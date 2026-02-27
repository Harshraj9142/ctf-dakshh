"use client";

import React, { useState, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { validateFlag } from "@/lib/flags";
import { useStore } from "@/store/useStore";
import { Flag, CheckCircle2, XCircle, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FlagModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function FlagModal({ open, onOpenChange }: FlagModalProps) {
    const [flagInput, setFlagInput] = useState("");
    const [result, setResult] = useState<{ valid: boolean; message: string } | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const solveRoom = useStore((s) => s.solveRoom);

    const handleSubmit = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault();
            if (!flagInput.trim()) return;

            setIsSubmitting(true);

            // Simulate processing delay for dramatic effect
            setTimeout(() => {
                const validation = validateFlag(flagInput);
                setResult(validation);

                if (validation.valid && validation.roomId) {
                    solveRoom(validation.roomId);
                }

                setIsSubmitting(false);
            }, 800);
        },
        [flagInput, solveRoom]
    );

    const handleClose = (open: boolean) => {
        if (!open) {
            setTimeout(() => {
                setFlagInput("");
                setResult(null);
            }, 300);
        }
        onOpenChange(open);
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Flag className="h-5 w-5" />
                        Submit Flag
                    </DialogTitle>
                    <DialogDescription>
                        Enter the flag you discovered. Format: dakshh&#123;...&#125;
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                    <Input
                        value={flagInput}
                        onChange={(e) => {
                            setFlagInput(e.target.value);
                            setResult(null);
                        }}
                        placeholder="dakshh{...}"
                        className="font-mono text-base"
                        autoFocus
                    />

                    <Button
                        type="submit"
                        variant="neon"
                        className="w-full"
                        disabled={isSubmitting || !flagInput.trim()}
                    >
                        {isSubmitting ? (
                            <motion.span
                                animate={{ opacity: [1, 0.3, 1] }}
                                transition={{ repeat: Infinity, duration: 0.8 }}
                            >
                                Validating...
                            </motion.span>
                        ) : (
                            "Submit Flag"
                        )}
                    </Button>
                </form>

                <AnimatePresence mode="wait">
                    {result && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className={`mt-4 p-4 rounded-lg border flex items-start gap-3 ${result.valid
                                    ? "border-[var(--neon-green)] bg-[rgba(57,255,20,0.1)]"
                                    : "border-[var(--neon-red)] bg-[rgba(255,7,58,0.1)]"
                                }`}
                        >
                            {result.valid ? (
                                <>
                                    <CheckCircle2 className="h-5 w-5 text-[var(--neon-green)] shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-[var(--neon-green)] font-bold text-sm">{result.message}</p>
                                        <div className="mt-2 flex items-center gap-1 text-[var(--neon-yellow)] text-xs">
                                            <Sparkles className="h-3 w-3" />
                                            <span>+XP earned! Check your dashboard.</span>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <XCircle className="h-5 w-5 text-[var(--neon-red)] shrink-0 mt-0.5" />
                                    <p className="text-[var(--neon-red)] text-sm">{result.message}</p>
                                </>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </DialogContent>
        </Dialog>
    );
}
