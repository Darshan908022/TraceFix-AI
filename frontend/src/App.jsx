import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Bell, 
  GitBranch, 
  BookOpen, 
  HelpCircle, 
  Search, 
  Upload, 
  Zap, 
  Cpu, 
  Settings,
  GitPullRequest
} from 'lucide-react';

export default function App() {
  const [logInput, setLogInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [prLoading, setPrLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [prStatus, setPrStatus] = useState(null);

  // Call /analyze-log Endpoint
  const handleAnalyze = async () => {
    if (!logInput.trim()) return;
    setLoading(true);
    setPrStatus(null);
    
    try {
      const response = await fetch('http://127.0.0.1:8000/analyze-log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ logs: logInput })
      });
      
      if (!response.ok) {
        throw new Error(`Server returned status: ${response.status}`);
      }

      const data = await response.json();
      setAnalysis(data);
    } catch (err) {
      console.error("Backend Error:", err);
      alert("Failed to connect to backend or process log. Check browser console.");
    } finally {
      setLoading(false);
    }
  };

  // Call /trigger-remediation Endpoint
  const handleTriggerPR = async () => {
    if (!analysis) return;
    setPrLoading(true);
    
    try {
      const response = await fetch('http://127.0.0.1:8000/trigger-remediation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(analysis)
      });

      const data = await response.json();
      if (response.ok) {
        setPrStatus({ success: true, url: data.pull_request_url, message: data.message });
      } else {
        setPrStatus({ success: false, message: data.detail || "PR creation failed" });
      }
    } catch (err) {
      console.error("PR Error:", err);
      setPrStatus({ success: false, message: "Network error triggering PR" });
    } finally {
      setPrLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#0b0f19] text-slate-200 font-sans antialiased overflow-hidden">
      {/* Left Sidebar */}
      <aside className="w-64 border-r border-slate-800/60 bg-[#0d1322] flex flex-col justify-between p-4">
        <div>
          {/* Logo */}
          <div className="flex items-center gap-3 px-3 py-4 mb-6 border-b border-slate-800/60">
            <div className="p-2 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-400">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-bold text-slate-100 tracking-wide text-lg">TraceFix AI</h1>
              <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                System Operational
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 font-medium text-sm border border-emerald-500/20">
              <LayoutDashboard className="w-4 h-4" /> Dashboard
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 text-sm font-medium transition">
              <FileText className="w-4 h-4" /> Logs
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 text-sm font-medium transition">
              <Bell className="w-4 h-4" /> Alerts
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 text-sm font-medium transition">
              <GitBranch className="w-4 h-4" /> Integrations
            </a>
          </nav>
        </div>

        {/* Bottom Nav */}
        <div className="space-y-1 border-t border-slate-800/60 pt-4">
          <a href="#" className="flex items-center gap-3 px-3 py-2 text-xs font-medium text-slate-400 hover:text-slate-200">
            <BookOpen className="w-4 h-4" /> Docs
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 text-xs font-medium text-slate-400 hover:text-slate-200">
            <HelpCircle className="w-4 h-4" /> Support
          </a>
        </div>
      </aside>

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 border-b border-slate-800/60 bg-[#0d1322]/50 flex items-center justify-between px-8">
          <div className="relative w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search traces, services..." 
              className="w-full bg-[#131b2e] border border-slate-800 rounded-md py-1.5 pl-9 pr-3 text-xs text-slate-300 focus:outline-none focus:border-slate-700"
            />
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <Bell className="w-4 h-4 hover:text-slate-200 cursor-pointer" />
            <Settings className="w-4 h-4 hover:text-slate-200 cursor-pointer" />
            <div className="w-8 h-8 rounded-full bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-300 font-bold text-xs">
              DS
            </div>
          </div>
        </header>

        {/* Workspace Content */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-100">Diagnostic Workspace</h2>
              <p className="text-xs text-slate-400 mt-1">Paste stack traces or error logs for instant AI analysis.</p>
            </div>
            <button className="flex items-center gap-2 border border-slate-700 hover:border-slate-600 bg-[#131b2e] text-slate-300 px-3 py-1.5 rounded-lg text-xs font-medium transition">
              <Upload className="w-3.5 h-3.5" /> Upload File
            </button>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-12 gap-6">
            {/* Left Column - Log Input */}
            <div className="col-span-7 bg-[#131b2e]/60 border border-slate-800 rounded-xl p-5 flex flex-col h-[580px]">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5" /> Log Input
                </span>
              </div>

              <textarea
                value={logInput}
                onChange={(e) => setLogInput(e.target.value)}
                placeholder={`Paste standard out, stack traces, or raw JSON logs here...`}
                className="flex-1 w-full bg-[#0b0f19] border border-slate-800/80 rounded-lg p-4 font-mono text-xs text-slate-300 placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 resize-none leading-relaxed"
              />

              <div className="flex items-center justify-between mt-4">
                <button className="border border-slate-800 hover:bg-slate-800/50 text-slate-400 px-3 py-1.5 rounded-lg text-xs font-medium transition">
                  Auto-detect Format
                </button>
                <button
                  onClick={handleAnalyze}
                  disabled={loading}
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-xs font-semibold shadow-lg shadow-indigo-600/20 transition disabled:opacity-50"
                >
                  <Zap className="w-3.5 h-3.5" /> {loading ? "Analyzing Log..." : "Analyze Log"}
                </button>
              </div>
            </div>

            {/* Right Column - AI Diagnostic Results */}
            <div className="col-span-5 bg-[#131b2e]/60 border border-slate-800 rounded-xl p-5 flex flex-col justify-between h-[580px]">
              <div>
                <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
                  <span className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-indigo-400" /> AI Diagnostic Results
                  </span>
                  {analysis && (
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-semibold px-2 py-0.5 rounded">
                      Analysis Complete
                    </span>
                  )}
                </div>

                {/* Root Cause Section */}
                <div className="mb-4">
                  <h4 className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">Root Cause Analysis</h4>
                  <div className="bg-[#0b0f19] border border-slate-800/80 rounded-lg p-3 text-xs text-slate-300 leading-relaxed max-h-24 overflow-y-auto">
                    {analysis ? analysis.root_cause : "Paste error logs and click 'Analyze Log' to view AI diagnostic output."}
                  </div>
                </div>

                {/* Metrics Row */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-[#0b0f19] border border-slate-800/80 rounded-lg p-3 text-center">
                    <span className="text-[10px] uppercase font-medium text-slate-500">Severity Score</span>
                    <div className="text-xl font-extrabold text-rose-500 mt-1">
                      {analysis ? `${analysis.severity_score} / 100` : "--"}
                    </div>
                  </div>
                  <div className="bg-[#0b0f19] border border-slate-800/80 rounded-lg p-3 text-center">
                    <span className="text-[10px] uppercase font-medium text-slate-500">Est. Downtime Cost</span>
                    <div className="text-xl font-extrabold text-amber-400 mt-1">
                      {analysis ? analysis.estimated_downtime_cost : "--"}
                    </div>
                  </div>
                </div>

                {/* Suggested Fix */}
                <div>
                  <h4 className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">Suggested Fix</h4>
                  <pre className="bg-[#0b0f19] border border-slate-800/80 rounded-lg p-3 font-mono text-[11px] text-emerald-400 whitespace-pre-wrap leading-relaxed max-h-32 overflow-y-auto">
                    {analysis ? analysis.suggested_fix : "# Awaiting analysis execution..."}
                  </pre>
                </div>
              </div>

              {/* Action Button & Status Output */}
              <div className="pt-3 border-t border-slate-800">
                {prStatus && (
                  <div className={`mb-2 p-2 rounded text-[11px] text-center ${prStatus.success ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'}`}>
                    {prStatus.message}
                    {prStatus.url && (
                      <div className="mt-1">
                        <a href={prStatus.url} target="_blank" rel="noreferrer" className="underline font-bold text-emerald-400">
                          View Pull Request on GitHub
                        </a>
                      </div>
                    )}
                  </div>
                )}
                <button 
                  onClick={handleTriggerPR}
                  disabled={!analysis || prLoading}
                  className="w-full flex items-center justify-center gap-2 bg-rose-300 hover:bg-rose-200 disabled:opacity-40 text-slate-900 font-bold py-2.5 rounded-lg text-xs transition shadow-lg shadow-rose-300/10"
                >
                  <GitPullRequest className="w-4 h-4" /> {prLoading ? "Creating Pull Request..." : "Trigger Automated GitHub PR"}
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}