// App.jsx - Refined Futuristic Helper Prototype
import { useState, useEffect, useRef } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Home01Icon,
  Search01Icon,
  UserIcon,
  Calendar01Icon,
  ImageAdd01Icon,
  Camera01Icon,
  CheckmarkCircle01Icon,
  StarIcon,
  Message01Icon,
  ArrowRight01Icon,
  Clock01Icon,
  Tick01Icon,
  ArrowLeft01Icon,
  Shield01Icon,
  Location01Icon,
  CallIcon,
  InformationCircleIcon,
  AiCloudIcon,
  SparklesIcon
} from '@hugeicons/core-free-icons';
import './App.css';

const Avatar = ({ name, size = 44, color, src }) => {
  const initials = name
    ? name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
    : '';

  return (
    <div className="avatar" style={{ width: size, height: size, backgroundColor: color || 'rgba(99, 102, 241, 0.1)' }}>
      {src ? (
        <img
          src={src}
          alt={name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
        />
      ) : null}
      <span style={{ fontSize: size * 0.35, fontWeight: 800, color: '#fff', display: src ? 'none' : 'flex', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
        {initials}
      </span>
    </div>
  );
};

function App() {
  const [screen, setScreen] = useState('home');
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isAITyping, setIsAITyping] = useState(false);
  const [showFindButton, setShowFindButton] = useState(false);
  const [pros, setPros] = useState([]);
  const [selectedPro, setSelectedPro] = useState(null);
  const [directMessages, setDirectMessages] = useState({});
  const chatEndRef = useRef(null);

  const mockPros = [
    {
      id: 1,
      name: "Mario's Plumbing",
      specialty: 'Plumbing',
      rating: 4.9,
      logoColor: 'rgba(99, 102, 241, 0.2)',
      bio: "Master plumber with 15+ years experience. Specialized in complex leak detection and eco-friendly fixtures.",
      verified: true
    },
    {
      id: 2,
      name: 'QuickFix Services',
      specialty: 'Handyman',
      rating: 4.6,
      logoColor: 'rgba(236, 72, 153, 0.2)',
      bio: "Your neighborhood all-in-one fixxer. From shelving to smart home setup, we do it all quickly and cleanly.",
      verified: true
    }
  ];

  const recentOrders = [
    { id: 1, service: 'Plumbing Repair', pro: "Mario's Plumbing", date: 'Oct 24', status: 'Completed' },
    { id: 2, service: 'Electrician', pro: 'Elite Pros', date: 'Oct 20', status: 'Completed' }
  ];

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, screen, isAITyping]);

  const addMessage = (text, sender, imageUrl = null, chips = null) => {
    if (screen === 'direct-chat' && selectedPro) {
      setDirectMessages(prev => {
        const proMsgs = prev[selectedPro.id] || [];
        return {
          ...prev,
          [selectedPro.id]: [...proMsgs, { id: Date.now(), text, sender, imageUrl }]
        };
      });
    } else {
      setMessages(prev => [...prev, { id: Date.now(), text, sender, imageUrl, chips }]);
    }
  };

  const handleStartNewChat = () => {
    setScreen('chat');
    setIsAITyping(true);
    setTimeout(() => {
      setIsAITyping(false);
      setMessages([{
        id: 1,
        text: "System initialized. I'm Fixxy, your futuristic home repair assistant. 🌌\n\nI can sense something needs attention. Describe the issue or show me a scan (photo) and I'll find the perfect specialist to handle it instantly.",
        sender: 'ai'
      }]);
    }, 800);
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    const msgText = inputText;
    addMessage(msgText, 'user');
    setInputText('');
    setIsAITyping(true);

    setTimeout(() => {
      setIsAITyping(false);
      if (screen === 'direct-chat') {
        addMessage(`Acknowledged. I'll be there tomorrow at 9:00 AM sharp to resolve this.`, 'ai');
      } else if (messages.length < 3) {
        addMessage("Understood. Analyzing the details... To ensure I match you with the absolute best expert, could you upload a visual scan of the area? Is this an immediate system failure (emergency)?", 'ai');
      } else {
        setShowFindButton(true);
        addMessage("Scanned and analyzed. I've narrowed down the field to two elite specialists with verified success in this specific scenario. Ready to initiate contact?", 'ai');
      }
    }, 1500);
  };

  const handleSendImage = () => {
    addMessage("Uploading visual scan...", 'user', 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=400&auto=format&fit=crop');
    setIsAITyping(true);
    setTimeout(() => {
      setIsAITyping(false);
      addMessage("Scan complete. I've identified a valve pressure variance. My top-tier pros are standing by. Initiating match sequence...", 'ai');
      setTimeout(() => handleFindFixxer(), 1200);
    }, 1800);
  };

  const handleFindFixxer = () => {
    setShowFindButton(false);
    setIsAITyping(true);
    setTimeout(() => {
      setIsAITyping(false);
      setPros(mockPros);
      addMessage("PROS_LIST", 'ai');
      addMessage("Selection optimized. These specialists are currently active and nearby. Select one to proceed.", 'ai');
    }, 1500);
  };

  const handleContactNow = (pro) => {
    setScreen('chat');
    setIsAITyping(true);
    setTimeout(() => {
      setIsAITyping(false);
      addMessage(
        `Success! Connection protocol established with ${pro.name}. They are reviewing your scan now and will reach out in the Tracking terminal. 🛰️\n\nSystem check: is there anything else I can optimize for you right now?`,
        'ai',
        null,
        ['No, I am good', 'Yes, one more thing', 'Talk to Human']
      );

      setTimeout(() => {
        setDirectMessages(prev => ({
          ...prev,
          [pro.id]: [{ id: 1, text: `Hi! This is ${pro.name}. I've reviewed your request. I can assist you this afternoon.`, sender: 'ai' }]
        }));
      }, 4000);
    }, 1500);
  };

  const handleChipClick = (chip) => {
    addMessage(chip, 'user');
    setIsAITyping(true);
    setTimeout(() => {
      setIsAITyping(false);
      if (chip.includes('No')) {
        addMessage("Excellent. Mission accomplished. I'll be in standby mode if you need further assistance. Rest easy.", 'ai');
      } else if (chip.includes('Yes')) {
        addMessage("Standing by for your input. What else can I assist with?", 'ai');
      } else {
        addMessage("Routing through to a human protocol lead. Connecting now...", 'ai');
      }
    }, 1000);
  };

  const handleOpenDirectChat = (pro) => {
    setSelectedPro(pro);
    setScreen('direct-chat');
  };

  const renderHome = () => (
    <div className="home-content">
      <div className="new-chat-section">
        <h2 className="new-chat-title">Intelligent Support</h2>
        <p className="new-chat-subtitle">Facing a home challenge? Trigger your AI assistant to find instant, verified solutions.</p>
        <button className="new-chat-button" onClick={handleStartNewChat}>
          <HugeiconsIcon icon={AiCloudIcon} size={20} />
          Launch Assistant
        </button>
      </div>

      <div className="home-section">
        <div className="section-header">
          <h3 className="section-title">System History</h3>
          <span style={{ fontSize: 13, fontWeight: 800, color: 'var(--primary)', cursor: 'pointer' }}>View Archives</span>
        </div>

        <div className="activity-list">
          {recentOrders.map(order => (
            <div key={order.id} className="activity-card">
              <div className="activity-icon"><HugeiconsIcon icon={Tick01Icon} size={24} color="var(--primary)" /></div>
              <div className="activity-details">
                <div className="activity-service" style={{ color: 'var(--text-primary)' }}>{order.service}</div>
                <div className="activity-meta"><span>{order.pro}</span> • <span>{order.date}</span></div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 800, fontSize: 14, color: 'var(--accent)' }}>SUCCESS</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderChat = () => (
    <div className="chat-container">
      <div className="messages" style={{ paddingBottom: '140px' }}>
        {messages.map(msg => (
          <div key={msg.id} className="message-wrapper" style={{ alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
            {msg.text === 'PROS_LIST' ? (
              <div className="pros-list">
                {pros.map(pro => (
                  <div key={pro.id} className="pro-card">
                    <div className="pro-header">
                      <Avatar name={pro.name} color={pro.logoColor} size={56} />
                      <div className="pro-info">
                        <div className="pro-name" style={{ color: 'var(--text-primary)' }}>{pro.name} <HugeiconsIcon icon={CheckmarkCircle01Icon} size={18} color="var(--accent)" /></div>
                        <div className="pro-rating" style={{ color: 'var(--text-secondary)' }}><HugeiconsIcon icon={StarIcon} size={16} color="var(--accent)" /><span>{pro.rating}</span></div>
                      </div>
                    </div>
                    <div className="pro-actions">
                      <button className="btn-secondary" style={{ background: 'transparent', color: 'var(--text-primary)', border: '1px solid var(--border)' }} onClick={() => { setSelectedPro(pro); setScreen('pro-detail') }}>Explore</button>
                      <button className="btn-primary" onClick={() => handleContactNow(pro)}>Connect</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <div className={`message ${msg.sender}-message`}>
                  <div style={{ whiteSpace: 'pre-line' }}>{msg.text}</div>
                  {msg.imageUrl && <img src={msg.imageUrl} alt="issue" className="message-image" />}
                </div>
                <div className="message-meta">{msg.sender === 'ai' ? 'Fixxy Core' : 'Protocol'} • Now</div>

                {msg.chips && (
                  <div className="chips-container">
                    {msg.chips.map(chip => (
                      <button key={chip} className="chip-btn" onClick={() => handleChipClick(chip)}>
                        {chip}
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        ))}
        {isAITyping && (
          <div className="message-wrapper">
            <div className="message ai-message"><div className="typing-dots"><span></span><span></span><span></span></div></div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>
    </div>
  );

  const renderStatus = () => {
    const activeRequests = mockPros.filter(pro => directMessages[pro.id]);

    return (
      <div className="home-content">
        <div className="status-list">
          {activeRequests.length > 0 ? activeRequests.map(pro => (
            <div key={pro.id} className="request-card" onClick={() => handleOpenDirectChat(pro)}>
              <div className="new-msg-dot"></div>
              <div className="request-header">
                <div>
                  <div className="request-title" style={{ color: '#fff' }}>{pro.specialty} Node</div>
                  <div style={{ fontSize: 12, color: 'var(--text-tertiary)', fontWeight: 700, marginTop: 4 }}>SYNCED 2 MINS AGO</div>
                </div>
                <div className="request-status-pill" style={{ background: 'rgba(6, 182, 212, 0.1)', color: 'var(--accent)', border: '1px solid rgba(6, 182, 212, 0.2)' }}>
                  <HugeiconsIcon icon={SparklesIcon} size={14} />
                  ACTIVE
                </div>
              </div>

              <div className="provider-snippet">
                <Avatar name={pro.name} size={40} />
                <div className="snippet-text">
                  <div style={{ fontSize: 14, fontWeight: 900, color: '#fff', marginBottom: 2 }}>{pro.name}</div>
                  <span style={{ color: 'var(--text-secondary)' }}>{directMessages[pro.id][directMessages[pro.id].length - 1].text}</span>
                </div>
                <HugeiconsIcon icon={ArrowRight01Icon} size={20} color="var(--primary)" />
              </div>
            </div>
          )) : (
            <div style={{ textAlign: 'center', padding: '120px 24px', color: 'var(--text-tertiary)' }}>
              <div style={{ width: 80, height: 80, background: 'rgba(255, 255, 255, 0.03)', borderRadius: '30px', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center', marginBottom: 24, border: '1px solid var(--glass-border)' }}>
                <HugeiconsIcon icon={Calendar01Icon} size={40} style={{ opacity: 0.2 }} />
              </div>
              <p style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-secondary)' }}>No active streams</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderDirectChat = () => (
    <div className="chat-container" style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: 0 }}>
      <div className="direct-chat-header">
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)' }} onClick={() => setScreen('status')}><HugeiconsIcon icon={ArrowLeft01Icon} size={20} /></button>
        <Avatar name={selectedPro.name} size={40} /><div style={{ flex: 1 }}><div style={{ fontWeight: 800, fontSize: 15, color: 'var(--text-primary)' }}>{selectedPro.name}</div><div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--accent)', fontWeight: 800 }}><div className="online-indicator"></div> LINK ACTIVE</div></div><HugeiconsIcon icon={CallIcon} size={20} color="var(--text-secondary)" />
      </div>
      <div className="messages" style={{ flex: 1, padding: '24px' }}>
        {(directMessages[selectedPro.id] || []).map(msg => (
          <div key={msg.id} className="message-wrapper" style={{ alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
            <div className={`message ${msg.sender}-message`}>{msg.text}</div>
            <div className="message-meta">{msg.sender === 'ai' ? selectedPro.name : 'Link'}</div>
          </div>
        ))}
        {isAITyping && <div className="message-wrapper"><div className="message ai-message"><div className="typing-dots"><span></span><span></span><span></span></div></div></div>}
        <div ref={chatEndRef} />
      </div>
    </div>
  );

  const renderProDetail = () => (
    <div className="pro-detail-container" style={{ background: 'transparent' }}>
      <div className="pro-detail-header" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1581244276891-6bc396ff778b?q=80&w=800&auto=format&fit=crop')" }}><button className="back-button" style={{ background: 'rgba(255,255,255,0.8)', color: 'var(--text-primary)', border: '1px solid var(--glass-border)' }} onClick={() => setScreen('chat')}><HugeiconsIcon icon={ArrowLeft01Icon} size={20} /></button></div>
      <div className="pro-detail-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
          <div><h2 className="pro-detail-title" style={{ color: 'var(--text-primary)' }}>{selectedPro.name}</h2><div className="pro-rating" style={{ color: 'var(--accent)' }}><HugeiconsIcon icon={StarIcon} size={16} color="var(--accent)" /><span style={{ fontWeight: 800 }}>{selectedPro.rating} PRO RATING</span></div></div>
          <Avatar name={selectedPro.name} size={64} />
        </div>
        <div className="pro-detail-chips"><div className="chip">{selectedPro.specialty}</div><div className="chip">SECURE</div></div>
        <div className="pro-section" style={{ background: 'rgba(255,255,255,0.4)', padding: 24, borderRadius: 24, border: '1px solid var(--glass-border)' }}><h3 className="pro-section-title" style={{ color: 'var(--accent)' }}>Core Bio</h3><p className="pro-section-text" style={{ color: 'var(--text-secondary)' }}>{selectedPro.bio}</p></div>
        <button className="btn-primary" style={{ width: '100%', marginTop: 24 }} onClick={() => handleContactNow(selectedPro)}>Initialize Connection</button>
      </div>
    </div>
  );

  return (
    <div className="phone-container">
      <div className="phone">
        <div className="status-bar"><span>9:41</span><div style={{ display: 'flex', gap: 10 }}>📶 📡 🔋</div></div>

        {screen !== 'pro-detail' && screen !== 'direct-chat' && (
          <div className="header">
            <div>
              <h1 className="header-title">
                {screen === 'home' ? 'Fixxy' : (screen === 'status' ? 'Tracking' : 'Stream')}
              </h1>
              <p className="header-subtitle">Helper Protocol V1.0</p>
            </div>
            {screen === 'status' && (
              <div style={{ background: 'rgba(99, 102, 241, 0.2)', padding: '8px 16px', borderRadius: '16px', fontSize: 13, fontWeight: 900, color: 'var(--primary)', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
                {mockPros.filter(p => directMessages[p.id]).length} ACTIVE
              </div>
            )}
            {screen !== 'status' && <Avatar name="Kay User" size={44} />}
          </div>
        )}

        {screen === 'home' && renderHome()}
        {screen === 'chat' && renderChat()}
        {screen === 'pro-detail' && renderProDetail()}
        {screen === 'status' && renderStatus()}
        {screen === 'direct-chat' && renderDirectChat()}

        {(screen === 'chat' || screen === 'direct-chat') && (
          <div className="input-container">
            <button className="attachment-btn" onClick={handleSendImage}><HugeiconsIcon icon={Camera01Icon} size={22} color="#fff" /></button>
            <input className="message-input" placeholder="Input command..." value={inputText} onChange={(e) => setInputText(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} />
            <button className="send-button" onClick={handleSendMessage}><HugeiconsIcon icon={ArrowRight01Icon} size={28} color="#fff" /></button>
          </div>
        )}

        {screen !== 'pro-detail' && screen !== 'direct-chat' && (
          <div className="bottom-nav">
            <div className={`nav-item ${screen === 'home' ? 'active' : ''}`} onClick={() => setScreen('home')}><HugeiconsIcon icon={Home01Icon} size={24} /><span className="nav-label">Core</span></div>
            <div className={`nav-item ${screen === 'chat' ? 'active' : ''}`} onClick={() => setScreen('chat')}><HugeiconsIcon icon={Search01Icon} size={24} /><span className="nav-label">Sync</span></div>
            <div className={`nav-item ${screen === 'status' ? 'active' : ''}`} onClick={() => setScreen('status')}><HugeiconsIcon icon={Calendar01Icon} size={24} /><span className="nav-label">Stream</span></div>
            <div className="nav-item"><HugeiconsIcon icon={UserIcon} size={24} /><span className="nav-label">Auth</span></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
