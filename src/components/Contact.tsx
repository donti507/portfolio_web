import React, { useState } from 'react';
import { Mail, Github, Linkedin, MessageSquare, Terminal, Send, ArrowRight } from 'lucide-react';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [payload, setPayload] = useState('');
  const [transmissionState, setTransmissionState] = useState<'default' | 'pending' | 'success' | 'error'>('default');
  const [errorCode, setErrorCode] = useState<string>('');
  const [isShaking, setIsShaking] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [buttonState, setButtonState] = useState<{
    text: string;
    style: React.CSSProperties;
    disabled: boolean;
  }>({
    text: 'TRANSMIT PACKET ➤',
    style: { backgroundColor: '#FFB800', color: '#000', opacity: 1 },
    disabled: false
  });

  const triggerShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 450);
  };

  const getLogText = () => {
    switch (transmissionState) {
      case 'pending':
        return '>> PACKET_QUEUED // ROUTING_TO_GATEWAY...';
      case 'success':
        return `>> TRANSMISSION_COMPLETE // STATUS=200_OK\n>> PACKET_DELIVERED_TO: ALI.ASHRAF.YAD01@GMAIL.COM\n>> RESPONSE_ETA: 24–48HRS`;
      case 'error':
        return `>> ERROR: PACKET_REJECTED // GATEWAY_FAULT\n>> CODE: ${errorCode || 'UNKNOWN'}\n>> RETRY_OR_USE_DIRECT_CHANNEL`;
      case 'default':
      default:
        return `>> GATEWAY: READY TO EMBARK PORTAL...\n>> PING DIRECT_PROXY // STATUS=OK... ENVELOPE OPENED.`;
    }
  };

  const getLogStyles = () => {
    const colors = {
      default: '#FFB800',
      pending: '#FFB800',
      success: '#00d4aa',
      error: '#ff4560',
    };
    const borderColors = {
      default: 'rgba(255,184,0,0.2)',
      pending: 'rgba(255,184,0,0.2)',
      success: 'rgba(0,212,170,0.3)',
      error: 'rgba(255,69,96,0.3)',
    };
    return {
      color: colors[transmissionState],
      borderColor: borderColors[transmissionState],
    };
  };

  const contactCards = [
    {
      id: 'linkedin',
      icon: Linkedin,
      label: 'LINKEDIN',
      value: 'linkedin.com/in/md-ali-ashraf-y-28867524b',
      href: 'https://www.linkedin.com/in/md-ali-ashraf-y-28867524b/',
      badge: 'PROFESSIONAL',
      badgeStyle: 'border border-[#FFB800]/30 text-[#FFB800]',
      type: 'link'
    },
    {
      id: 'email',
      icon: Mail,
      label: 'EMAIL',
      value: 'ali.ashraf.yad01@gmail.com',
      href: 'mailto:ali.ashraf.yad01@gmail.com',
      badge: 'PRIMARY',
      badgeStyle: 'bg-[#FFB800] text-black font-extrabold',
      type: 'link'
    },
    {
      id: 'github',
      icon: Github,
      label: 'GITHUB',
      value: 'github.com/donti507',
      href: 'https://github.com/donti507',
      badge: 'CODE',
      badgeStyle: 'border border-white/20 text-[#888888]',
      type: 'link'
    },
    {
      id: 'whatsapp',
      icon: MessageSquare,
      label: 'WHATSAPP',
      value: '+48 504 184 806',
      href: 'https://wa.me/48504184806',
      badge: 'MOBILE',
      badgeStyle: 'border border-white/20 text-[#888888]',
      type: 'link'
    },
    {
      id: 'wechat',
      icon: MessageSquare,
      label: 'WECHAT',
      value: '+48 577 758 192',
      badge: 'MOBILE',
      badgeStyle: 'border border-white/20 text-[#888888]',
      type: 'copy'
    },
    {
      id: 'discord',
      icon: MessageSquare,
      label: 'DISCORD',
      value: 'ani221b_221',
      badge: 'CASUAL',
      badgeStyle: 'border border-white/10 text-[#888888]/60',
      type: 'copy'
    }
  ];

  const handleCardClick = (card: typeof contactCards[0]) => {
    if (card.type === 'copy') {
      navigator.clipboard.writeText(card.value);
      setCopiedId(card.id);
      setTimeout(() => setCopiedId(null), 2000);
    } else if (card.id === 'email') {
      window.location.href = card.href || '';
    } else {
      window.open(card.href, '_blank', 'noopener,noreferrer');
    }
  };

  const sendPacket = (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    const name = senderName.trim();
    const email = senderEmail.trim();
    const message = payload.trim();

    // Validation
    if (!name || !email || !message) {
      setTransmissionState('error');
      setErrorCode('ALL_FIELDS_REQUIRED');
      triggerShake();
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setTransmissionState('error');
      setErrorCode('INVALID_ENVELOPE_ADDR');
      return;
    }

    // Loading/Pending state
    setTransmissionState('pending');
    setButtonState({
      text: 'TRANSMITTING... ◈',
      style: { backgroundColor: '#FFB800', color: '#000', opacity: 0.7 },
      disabled: true
    });

    const templateParams = {
      from_name: name,
      from_email: email,
      message: message,
      to_email: 'ali.ashraf.yad01@gmail.com'
    };

    const serviceId = (import.meta as any).env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
    const templateId = (import.meta as any).env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
    const publicKey = (import.meta as any).env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';

    emailjs.init(publicKey);

    emailjs.send(serviceId, templateId, templateParams)
      .then(() => {
        // Success state
        setTransmissionState('success');
        setButtonState({
          text: 'PACKET_DELIVERED ✓',
          style: { backgroundColor: '#00d4aa', color: '#000', opacity: 1 },
          disabled: true
        });

        // Clear Form fields
        setSenderName('');
        setSenderEmail('');
        setPayload('');

        // Reset button after 4 seconds
        setTimeout(() => {
          setButtonState({
            text: 'TRANSMIT PACKET ➤',
            style: { backgroundColor: '#FFB800', color: '#000', opacity: 1 },
            disabled: false
          });
          setTransmissionState('default');
        }, 4000);
      })
      .catch((error: any) => {
        // Error state
        setTransmissionState('error');
        setErrorCode(error.status ? String(error.status) : 'GATEWAY_FAULT');
        
        setButtonState({
          text: 'TRANSMISSION_FAILED ✗',
          style: { backgroundColor: '#ff4560', color: '#fff', opacity: 1 },
          disabled: true
        });

        // Reset button after 4 seconds
        setTimeout(() => {
          setButtonState({
            text: 'TRANSMIT PACKET ➤',
            style: { backgroundColor: '#FFB800', color: '#000', opacity: 1 },
            disabled: false
          });
          setTransmissionState('default');
        }, 4000);
      });
  };

  return (
    <div className="pt-32 pb-24 px-4 md:px-12 max-w-[1240px] mx-auto animate-fadeIn">
      {/* Top Header */}
      <header className="mb-16">
        <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-[#FFB800] uppercase block mb-1">
          NETWORK_INTERFACE
        </span>
        <h1 className="text-5xl md:text-7xl font-sans font-extrabold text-white uppercase tracking-tighter mb-4 leading-none animate-slideUp">
          Contact Portal
        </h1>
        {/* Amber underbar */}
        <div className="w-[60px] h-[3px] bg-[#FFB800] mt-3" />
        <p className="text-[11px] font-mono tracking-[0.2em] text-[#888888] uppercase mt-4">
          SECURITY=VERIFIED // IP_PROXY=DIRECT // LATENCY=NOMINAL
        </p>
      </header>

      {/* Grid Layout: Left Cards, Right Telemetry & Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column (Directory Cards) */}
        <div className="lg:col-span-6 space-y-8">
          <div>
            <span className="text-[10px] font-mono text-[#FFB800] tracking-[0.2em] uppercase block mb-3 font-bold">
              GET_IN_TOUCH
            </span>
            <p className="text-sm text-[#888888] leading-relaxed font-light font-sans">
              Connect for academic inquiries, HPC collaboration benchmarking, IBM Z club partnerships, astronomical deep sky telemetry, or general smart AI development discussions.
            </p>
          </div>

          {/* 6 Directory Cards */}
          <div className="space-y-3">
            {contactCards.map((card) => {
              const IconComponent = card.icon;
              const isCopied = copiedId === card.id;

              return (
                <div
                  key={card.id}
                  onClick={() => handleCardClick(card)}
                  className="relative overflow-hidden group border border-white/8 bg-[#070707] transition-all duration-200 hover:bg-[#111111] p-5 flex items-center justify-between cursor-pointer"
                  id={`contact-card-${card.id}`}
                >
                  {/* Amber Left-Border - Slides/Translates in on Hover */}
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#FFB800] -translate-x-[3px] group-hover:translate-x-0 transition-transform duration-200" />

                  <div className="flex items-start gap-4">
                    <div className="mt-1 text-[#FFB800]/80 group-hover:text-[#FFB800] transition-colors">
                      <IconComponent className="w-5 h-5 animate-pulse" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-xs font-mono font-bold text-[#FFB800] uppercase tracking-wider">
                          {card.label}
                        </span>
                        <span className={`text-[9.5px] font-mono tracking-wide px-2 py-0.5 rounded-[4px] uppercase ${isCopied ? 'bg-[#00d4aa]/10 border border-[#00d4aa]/35 text-[#00d4aa] font-bold' : card.badgeStyle}`}>
                          {isCopied ? 'COPIED' : card.badge}
                        </span>
                      </div>
                      <span className="text-xs text-[#cccccc] font-sans break-all">
                        {card.value}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pl-4">
                    {isCopied ? (
                      <span className="text-[10px] font-mono font-bold text-[#00d4aa] uppercase tracking-widest animate-pulse">
                        COPIED
                      </span>
                    ) : (
                      <ArrowRight className="w-4 h-4 text-[#888888] group-hover:text-[#FFB800] group-hover:translate-x-1.5 transition-transform duration-200" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column (Status & Form) */}
        <div className="lg:col-span-6 space-y-8">
          {/* Terminal Telemetry Block */}
          <div className="bg-[#070707] border border-white/8 p-5 font-mono text-[11px] space-y-3 relative overflow-hidden">
            <div className="flex items-center gap-2 border-b border-white/8 pb-3 mb-2 text-[10px] text-[#888888] font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
              <span className="ml-1 tracking-widest text-[#FFB800] uppercase text-[9px]">SYSTEM_TELEMETRY // LIVE_CONFIG</span>
            </div>

            <div className="space-y-2.5">
              {/* SIGNAL STATUS */}
              <div className="flex items-end justify-between text-[#888888]">
                <span className="bg-[#070707] pr-2 z-10 font-bold text-white">&gt; SIGNAL_STATUS</span>
                <div className="flex-1 border-b border-dotted border-white/10 mb-[3px] mx-1" />
                <span className="bg-[#070707] pl-2 z-10 text-[#00d4aa] font-extrabold uppercase">OPEN</span>
              </div>

              {/* PREFERRED CHANNEL */}
              <div className="flex items-end justify-between text-[#888888]">
                <span className="bg-[#070707] pr-2 z-10">&gt; PREFERRED_CHANNEL</span>
                <div className="flex-1 border-b border-dotted border-white/10 mb-[3px] mx-1" />
                <span className="bg-[#070707] pl-2 z-10 text-white font-bold uppercase">EMAIL / LINKEDIN</span>
              </div>

              {/* LOCATION */}
              <div className="flex items-end justify-between text-[#888888]">
                <span className="bg-[#070707] pr-2 z-10">&gt; LOCATION</span>
                <div className="flex-1 border-b border-dotted border-white/10 mb-[3px] mx-1" />
                <span className="bg-[#070707] pl-2 z-10 text-white font-bold uppercase">WROCLAW, POLAND</span>
              </div>

              {/* TIMEZONE */}
              <div className="flex items-end justify-between text-[#888888]">
                <span className="bg-[#070707] pr-2 z-10">&gt; TIMEZONE</span>
                <div className="flex-1 border-b border-dotted border-white/10 mb-[3px] mx-1" />
                <span className="bg-[#070707] pl-2 z-10 text-white font-bold uppercase">CET (UTC+1)</span>
              </div>

              {/* LANGUAGES */}
              <div className="flex items-end justify-between text-[#888888]">
                <span className="bg-[#070707] pr-2 z-10">&gt; LANGUAGES</span>
                <div className="flex-1 border-b border-dotted border-white/10 mb-[3px] mx-1" />
                <span className="bg-[#070707] pl-2 z-10 text-white font-bold uppercase">EN / BN / PL (basic)</span>
              </div>

              {/* RESPONSE TIME */}
              <div className="flex items-end justify-between text-[#888888]">
                <span className="bg-[#070707] pr-2 z-10">&gt; RESPONSE_TIME</span>
                <div className="flex-1 border-b border-dotted border-white/10 mb-[3px] mx-1" />
                <span className="bg-[#070707] pl-2 z-10 text-white font-bold uppercase">24–48 HRS</span>
              </div>

              {/* COLLABORATION */}
              <div className="flex items-end justify-between text-[#888888]">
                <span className="bg-[#070707] pr-2 z-10">&gt; COLLABORATION</span>
                <div className="flex-1 border-b border-dotted border-white/10 mb-[3px] mx-1" />
                <span className="bg-[#070707] pl-2 z-10 text-[#00d4aa] font-bold uppercase">OPEN</span>
              </div>

              {/* INTERNSHIP */}
              <div className="flex items-end justify-between text-[#888888]">
                <span className="bg-[#070707] pr-2 z-10 font-bold text-[#FFB800]">&gt; INTERNSHIP</span>
                <div className="flex-1 border-b border-dotted border-white/10 mb-[3px] mx-1" />
                <span className="bg-[#070707] pl-2 z-10 text-[#FFB800] font-extrabold uppercase animate-pulse">ACTIVELY SEEKING</span>
              </div>

              {/* RESEARCH COLLAB */}
              <div className="flex items-end justify-between text-[#888888]">
                <span className="bg-[#070707] pr-2 z-10">&gt; RESEARCH_COLLAB</span>
                <div className="flex-1 border-b border-dotted border-white/10 mb-[3px] mx-1" />
                <span className="bg-[#070707] pl-2 z-10 text-white font-bold uppercase">OPEN</span>
              </div>

              {/* ACTIVE CHANNELS */}
              <div className="flex items-end justify-between text-[#888888]">
                <span className="bg-[#070707] pr-2 z-10 font-bold text-white">&gt; ACTIVE_CHANNELS</span>
                <div className="flex-1 border-b border-dotted border-white/10 mb-[3px] mx-1" />
                <span className="bg-[#070707] pl-2 z-10 text-[#FFB800] font-extrabold uppercase">6</span>
              </div>
            </div>
          </div>

          {/* Currently Seeking Tags */}
          <div className="space-y-3">
            <span className="text-[10px] font-mono text-[#FFB800] tracking-[0.25em] uppercase block font-bold">
              // CURRENTLY_SEEKING
            </span>
            <div className="flex flex-wrap gap-2">
              {['RESEARCH INTERNSHIP', 'TECHNICAL WRITING', 'ML / DATA SCIENCE ROLES', 'OPEN SOURCE COLLABS'].map((tag) => (
                <span
                  key={tag}
                  className="bg-white/5 border border-white/10 text-white text-[9px] font-mono font-bold px-2.5 py-1.5 rounded-[4px] uppercase tracking-wider"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

            {/* Secure Mail Gateway Panel */}
            <div className="bg-[#0f0f0f] border border-white/8 p-6 md:p-8">
              <div className="flex items-center gap-2 border-b border-white/8 pb-4 mb-6">
                <Terminal className="w-4 h-4 text-[#FFB800]" />
                <span className="font-mono text-[10px] text-[#FFB800] tracking-widest font-bold">
                  SECURE_MAIL_GATEWAY // SEND_PACKET_v2.0
                </span>
              </div>

              <form id="contact_form" onSubmit={sendPacket} className="space-y-4" style={{ animation: isShaking ? 'shake 0.4s ease' : undefined }}>
                {/* Sender Name */}
                <div>
                  <label className="block font-mono text-[9px] text-[#888888] tracking-widest uppercase mb-1.5 font-bold">
                    PACKET_SENDER_NAME
                  </label>
                  <input
                    id="sender_name"
                    type="text"
                    required
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="YOUR_FULL_NAME"
                    className="w-full bg-[#070707] border border-white/8 text-white px-4 py-3 text-xs font-mono tracking-widest focus:outline-none focus:border-[#FFB800] transition-colors"
                  />
                </div>

                {/* Sender Envelope Addr */}
                <div>
                  <label className="block font-mono text-[9px] text-[#888888] tracking-widest uppercase mb-1.5 font-bold">
                    SENDER_ENVELOPE_ADDR
                  </label>
                  <input
                    id="sender_email"
                    type="email"
                    required
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    placeholder="YOUR@EMAIL_PROVIDER.COM"
                    className="w-full bg-[#070707] border border-white/8 text-white px-4 py-3 text-xs font-mono tracking-widest focus:outline-none focus:border-[#FFB800] transition-colors"
                  />
                </div>

                {/* Payload Textarea */}
                <div>
                  <label className="block font-mono text-[9px] text-[#888888] tracking-widest uppercase mb-1.5 font-bold">
                    PACKET_PAYLOAD
                  </label>
                  <textarea
                    id="packet_payload"
                    required
                    rows={4}
                    value={payload}
                    onChange={(e) => setPayload(e.target.value)}
                    placeholder="WRITE_MESSAGE_NARRATIVE_STREAM_HERE..."
                    className="w-full bg-[#070707] border border-white/8 text-white p-4 text-xs font-mono tracking-widest focus:outline-none focus:border-[#FFB800] transition-colors resize-none leading-relaxed"
                  />
                </div>

                {/* Controls */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-3 gap-4">
                  <span className="font-mono text-[10px] text-[#888888] tracking-wider uppercase">
                    ENCRYPTION: SHIELD_NONE // ROUTING=PUBLIC_INET
                  </span>
                  <button
                    id="transmit_btn"
                    type="submit"
                    disabled={buttonState.disabled}
                    style={buttonState.style}
                    className="disabled:opacity-50 px-6 py-4 text-xs font-mono font-bold tracking-widest uppercase transition-all flex items-center gap-2 cursor-pointer w-full sm:w-auto justify-center"
                  >
                    {buttonState.text}
                  </button>
                </div>
              </form>

              {/* Dynamic Dynamic Transmission Log Box */}
              <div
                id="transmission_log"
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "11px",
                  lineHeight: "1.8",
                  color: getLogStyles().color,
                  background: "#0f0f0f",
                  border: `1px solid ${getLogStyles().borderColor}`,
                  padding: "16px 20px",
                  whiteSpace: "pre-line",
                  minHeight: "80px",
                  transition: "color 0.3s, border-color 0.3s",
                  marginTop: "2rem"
                }}
              >
                {getLogText()}
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}
