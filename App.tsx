
// App.tsx - Pulse Sovereign Trust Core Engine with On-Demand Sandboxed Demo Integration
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, SafeAreaView, Clipboard, ScrollView, Alert } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import PulseLogo from './PulseLogo';

// =========================================================================
// 🧮 SYSTEM DATA & PHYSICS INFRASTRUCTURE MATRIX
// =========================================================================
class CoreEcosystemEngine {
  public calculateSystemCharge(p: number, e: number, uq: number, dq: number, n: number, g: number): number {
    return (p * 1.0) - (e * 0.1) + (uq * 0.66) - (dq * 0.33) + (n * 0.025) - (g * 0.01);
  }

  public getTutorialSlides() {
    return [
      { step: 1, title: "🔐 Cryptographic Sovereign Identity", detail: "Your profile is uniquely anchored to a locally generated private key (Npriv). You own your data completely. Write your keys down physically offline." },
      { step: 2, title: "⚡ Zero-Fee Settlement Rails", detail: "Transactions bypass corporate merchant networks. Payments move directly peer-to-peer over the Bitcoin Lightning Network using scannable Bolt11 invoices." },
      { step: 3, title: "📊 Retained RWA Float Yield", detail: "While capital balances rest inside your open payment channels, the platform Sweeper automatically captures a 4.5% annualized return via short-term U.S. Treasury bills." },
      { step: 4, title: "🎮 Risk-Free Sandbox Simulation", detail: "Use the toggle above to launch a simulated Demo Account right now. Familiarize yourself with the interface before committing production capital." }
    ];
  }
}

const SystemKernel = new CoreEcosystemEngine();

export default function App() {
  // Navigation & UI Layout State Anchors
  const [activeTab, setActiveTab] = useState<'PAY' | 'TREASURY' | 'TUTORIAL'>('PAY');
  const [tutorialStep, setTutorialStep] = useState<number>(0);
  const [invoice, setInvoice] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // SANDBOX CONTROL: Tracks whether the user is executing actions in Demo Mode
  const [isDemoModeActive, setIsDemoModeActive] = useState<boolean>(false);

  // Core Financial Network Ledger States (Production Data Modifiers)
  const [networkLedger, setNetworkLedger] = useState({
    totalFloatSats: 450000000,
    annualizedYieldRate: 4.5,
    accumulatedInterestSats: 124580,
    baseAmountSats: 50000
  });

  const tutorialSlides = SystemKernel.getTutorialSlides();

  useEffect(() => {
    // Dynamically adjust parameters based on active environment (Demo vs Production)
    if (isDemoModeActive) {
      setInvoice('lnbc_DEMO_SANDBOX_INVOICE_SAMPLE_SATOSHIS_00000');
    } else {
      setInvoice('https://paypal.com');
    }
  }, [isDemoModeActive]);

  // Real-time compound yield simulation loop
  useEffect(() => {
    const yieldInterval = setInterval(() => {
      setNetworkLedger(prev => {
        // Double the mock interest ticking frequency inside demo mode to give users instant visual confirmation
        const multiplier = isDemoModeActive ? 10 : 1;
        const rateDecimal = prev.annualizedYieldRate / 100;
        const interestPerSecond = (prev.totalFloatSats * rateDecimal) / (365 * 24 * 3600);
        
        return {
          ...prev,
          accumulatedInterestSats: prev.accumulatedInterestSats + (interestPerSecond * multiplier)
        };
      });
    }, 1000);

    return () => clearInterval(yieldInterval);
  }, [isDemoModeActive]);

  /**
   * Action Handler: Forcefully disables demo sandbox environments upon exiting the guide panel
   */
  const navigateToSecureTab = (targetTab: 'PAY' | 'TREASURY' | 'TUTORIAL') => {
    if (targetTab !== 'TUTORIAL' && isDemoModeActive) {
      setIsDemoModeActive(false);
      Alert.alert("Demo Mode Deactivated", "Exited testing sandbox. Core client application has securely returned to the live production network layer.");
    }
    setActiveTab(targetTab);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Sovereign App Navigation Header */}
      <View style={styles.navHeader}>
        <PulseLogo size={42} />
        <View style={styles.tabButtons}>
          <TouchableOpacity style={[styles.tabButton, activeTab === 'PAY' && styles.activeTab]} onPress={() => navigateToSecureTab('PAY')}>
            <Text style={[styles.tabButtonText, activeTab === 'PAY' && styles.activeTabText]}>Sovereign Pay</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tabButton, activeTab === 'TREASURY' && styles.activeTab]} onPress={() => navigateToSecureTab('TREASURY')}>
            <Text style={[styles.tabButtonText, activeTab === 'TREASURY' && styles.activeTabText]}>RWA Yield</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tabButton, activeTab === 'TUTORIAL' && styles.activeTab]} onPress={() => navigateToSecureTab('TUTORIAL')}>
            <Text style={[styles.tabButtonText, activeTab === 'TUTORIAL' && styles.activeTabText]}>App Guide</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Global Sandbox Environment Indicator Ribbon */}
      {isDemoModeActive && (
        <View style={styles.demoRibbon}>
          <Text style={styles.demoRibbonText}>⚠️ RUNNING INSIDE RISK-FREE DEMO ENVIRONMENT</Text>
        </View>
      )}

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        {/* VIEW 1: PEER-TO-PEER TRANSACTION HUB */}
        {activeTab === 'PAY' && (
          <View style={styles.card}>
            <Text style={styles.title}>
              {isDemoModeActive ? "🎮 Simulated Sandbox Checkout" : "⚡ Instant P2P Payment Settlement"}
            </Text>
            <Text style={styles.amount}>
              {isDemoModeActive ? "100,000" : networkLedger.baseAmountSats.toLocaleString()} SATS
            </Text>
            <View style={styles.qrContainer}>
              {loading ? <ActivityIndicator size="large" color="#6366F1" /> : <QRCode value={invoice.toUpperCase()} size={180} color="#FAFAFA" backgroundColor="#18181B" />}
            </View>
            <TouchableOpacity style={styles.actionButton} onPress={() => Clipboard.setString(invoice)}>
              <Text style={styles.actionButtonText}>
                {isDemoModeActive ? "Copy Mock Invoice String" : "Copy Secure Invoice Address"}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* VIEW 2: REAL-WORLD ASSET (RWA) FLOATING INTEREST LEDGER */}
        {activeTab === 'TREASURY' && (
          <View style={styles.card}>
            <Text style={styles.shieldTitle}>PULSE SOVEREIGN TRUST</Text>
            <Text style={styles.mainBalance}>
              {Math.floor(networkLedger.accumulatedInterestSats).toLocaleString()} SATS
            </Text>
            <Text style={styles.yieldLabel}>
              {isDemoModeActive ? "💎 Accelerated Mock Yield Ticking (10x Speed)" : "💎 Live Compounding Treasury Interest"}
            </Text>
            <View style={styles.statsContainer}>
              <View style={styles.statRow}><Text style={styles.statKey}>Total Float Capital Pool:</Text><Text style={styles.statValue}>{networkLedger.totalFloatSats.toLocaleString()} Sats</Text></View>
              <View style={styles.statRow}><Text style={styles.statKey}>Ecosystem APY Capture:</Text><Text style={styles.statValueHost}>{networkLedger.annualizedYieldRate}% APY</Text></View>
              <View style={styles.statRow}><Text style={styles.statKey}>Environment Ledger Tracker:</Text><Text style={isDemoModeActive ? styles.statValueDemo : styles.statValueSecured}>{isDemoModeActive ? "SANDBOX_MOCK" : "PRODUCTION_LIVE"}</Text></View>
            </View>
          </View>
        )}

        {/* VIEW 3: INTERACTIVE APY TUTORIAL AND DEMO ACCOUNT TOGGLE HUD */}
        {activeTab === 'TUTORIAL' && (
          <View style={styles.card}>
            <Text style={styles.shieldTitle}>PULSE INTERACTIVE ONBOARDING</Text>
            <Text style={styles.subtitle}>Step {tutorialSlides[tutorialStep].step} of {tutorialSlides.length}</Text>
            
            {/* Interactive Environment Toggle Interface Access Layer */}
            <View style={styles.toggleContainer}>
              <Text style={styles.toggleLabel}>Toggle Demo Account Sandbox Status:</Text>
              <TouchableOpacity 
                style={[styles.toggleBtn, isDemoModeActive ? styles.toggleBtnOn : styles.toggleBtnOff]}
                onPress={() => {
                  setIsDemoModeActive(!isDemoModeActive);
                  Alert.alert(
                    isDemoModeActive ? "Production Return" : "Demo Sandbox Active", 
                    isDemoModeActive ? "Returned to authentic ledger matrix." : "Risk-free demo data state engaged successfully."
                  );
                }}
              >
                <Text style={styles.toggleBtnText}>{isDemoModeActive ? "DISCONNECT DEMO" : "INITIALIZE DEMO"}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.tutorialBox}>
              <Text style={styles.tutorialStepTitle}>{tutorialSlides[tutorialStep].title}</Text>
              <Text style={styles.tutorialStepDetails}>{tutorialSlides[tutorialStep].detail}</Text>
            </View>

            <View style={styles.row}>
              <TouchableOpacity 
                style={[styles.navButton, tutorialStep === 0 && { opacity: 0.4 }]} 
                disabled={tutorialStep === 0} 
                onPress={() => setTutorialStep(prev => prev - 1)}
              >
                <Text style={styles.navButtonText}>Back</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.navButton} 
                onPress={() => {

