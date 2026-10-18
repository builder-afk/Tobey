import { useState, useRef, useEffect } from 'react';
import {
  Terminal, Database, Cpu, CurlyBraces, Laptop,
  ArrowLeft, Copy, Check, ChevronDown, ChevronRight,
  BookOpen, Code2, Zap, Layers, Search, X,
  GraduationCap, Sparkles, Star, FileCode2, Hash,
  Download, Clock, AlertTriangle, Lightbulb, FileText, Settings, Server,
  Gem, Feather, Coffee, Boxes, Target
} from 'lucide-react';
import languageCurriculum from '../data/languageCurriculum';
import pythonNotes from '../data/pythonNotes';

// ── Icon map for languages ──
const langIcons = {
  python: Terminal,
  java: Server,
  cpp: Cpu,
  javascript: CurlyBraces,
  go: Laptop,
  rust: Settings,
  sql: Database,
  typescript: FileCode2,
  ruby: Gem,
  php: Layers,
  csharp: Hash,
  swift: Feather,
  kotlin: Coffee,
  scala: Boxes,
  dart: Target
};

const langKeys = ['python', 'java', 'cpp', 'javascript', 'go', 'rust', 'sql', 'typescript', 'ruby', 'php', 'csharp', 'swift', 'kotlin', 'scala', 'dart'];

// Palette accents for cards
const accentColors = ['bg-[#FFDE59]', 'bg-[#00F0FF]', 'bg-[#CCFF00]', 'bg-[#FF52D9]', 'bg-[#FF8811]', 'bg-[#7000FF]'];

// ── Copy-to-clipboard button ──
function CopyButton({ text, className = '' }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-[#FFDE59] border-2 border-black text-black font-mono font-black text-xs uppercase shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all ${className}`}
      title={copied ? 'Copied!' : 'Copy code'}
    >
      {copied ? <Check size={12} className="stroke-[3]" /> : <Copy size={12} className="stroke-[3]" />}
      <span>{copied ? 'COPIED' : 'COPY'}</span>
    </button>
  );
}

// ── Syntax-highlighted code block ──
function CodeBlock({ code, language = 'python' }) {
  const highlightCode = (raw) => {
    if (!raw) return '';
    const escaped = raw
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    const keywords = "import|from|def|class|return|if|elif|else|for|while|in|not|and|or|try|except|finally|raise|with|as|yield|async|await|pass|break|continue|lambda|is|None|True|False|self|super|global|nonlocal|public|private|protected|static|final|abstract|interface|implements|extends|void|new|this|throw|throws|catch|switch|case|default|package|func|struct|type|var|let|const|function|export|constructor|override|virtual|template|typename|namespace|using|include|constexpr|noexcept|nullptr|auto|make|chan|go|defer|select|range|map|nil|iota".split('|');
    const types = "int|float|double|string|bool|boolean|char|byte|short|long|String|Integer|Double|Float|Boolean|List|Map|Set|Array|ArrayList|HashMap|HashSet|Optional|vector|set|stack|queue|error|context|any".split('|');
    const builtins = "print|len|sum|min|max|list|dict|set|tuple|type|id|super|Exception|ValueError|TypeError".split('|');

    const regex = /("""[\s\S]*?"""|'''[\s\S]*?'''|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`[^`]*`)|(\/\/.*|#.*)|(@\w+)|(\b\d+\.?\d*[fLn]?\b)|([a-zA-Z_]\w*(?=\s*\())|([a-zA-Z_]\w*)/gm;

    return escaped.replace(regex, (match, stringMatch, commentMatch, decoratorMatch, numberMatch, functionMatch, wordMatch) => {
      if (stringMatch) return `<span class="text-[#CCFF00]">${stringMatch}</span>`;
      if (commentMatch) return `<span class="text-zinc-500 italic">${commentMatch}</span>`;
      if (decoratorMatch) return `<span class="text-[#FFDE59] font-bold">${decoratorMatch}</span>`;
      if (numberMatch) return `<span class="text-[#FF8811] font-bold">${numberMatch}</span>`;
      if (functionMatch) return `<span class="text-[#00F0FF] font-bold">${functionMatch}</span>`;
      if (wordMatch) {
        if (keywords.includes(wordMatch)) return `<span class="text-[#FF52D9] font-black">${wordMatch}</span>`;
        if (types.includes(wordMatch)) return `<span class="text-sky-300 font-bold">${wordMatch}</span>`;
        if (builtins.includes(wordMatch)) return `<span class="text-yellow-300">${wordMatch}</span>`;
      }
      return match;
    });
  };

  const lines = code.split('\n');

  return (
    <div className="relative group border-3 border-black bg-[#121214] shadow-[4px_4px_0px_#000] overflow-hidden">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-white border-b-3 border-black">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5 mr-2">
            <div className="w-3 h-3 bg-[#FF0033] border border-black"></div>
            <div className="w-3 h-3 bg-[#FFDE59] border border-black"></div>
            <div className="w-3 h-3 bg-[#CCFF00] border border-black"></div>
          </div>
          <span className="text-[11px] font-mono font-black uppercase text-black bg-[#FAF8F5] px-2 py-0.5 border border-black">
            {language}
          </span>
        </div>
        <CopyButton text={code} />
      </div>

      {/* Code content */}
      <div className="overflow-x-auto p-3">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, i) => (
              <tr key={i} className="hover:bg-white/[0.04] transition-colors">
                <td className="select-none text-right pr-4 pl-2 py-0.5 text-xs text-zinc-500 font-mono w-[1%] whitespace-nowrap border-r border-zinc-800">
                  {i + 1}
                </td>
                <td className="pl-4 pr-2 py-0.5">
                  <pre className="text-xs leading-relaxed font-mono text-zinc-200 whitespace-pre">
                    <code dangerouslySetInnerHTML={{ __html: highlightCode(line) }} />
                  </pre>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Cheat Sheet Card ──
function CheatSheetCard({ label, syntax }) {
  const formatted = syntax.replace(/\\n/g, '\n');
  return (
    <div className="bg-white border-3 border-black p-4 shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="px-2 py-0.5 bg-[#00F0FF] border-2 border-black font-mono font-black text-xs uppercase text-black shadow-[1px_1px_0px_#000]">
            {label}
          </span>
          <CopyButton text={formatted} />
        </div>
        <pre className="text-xs font-mono text-black font-bold leading-relaxed whitespace-pre-wrap break-all bg-[#FAF8F5] border-2 border-black p-3">
          {formatted}
        </pre>
      </div>
    </div>
  );
}

// ── Topic Card (expandable) ──
function TopicCard({ topic, index, langKey }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white border-3 border-black shadow-[4px_4px_0px_#000] mb-4 overflow-hidden">
      {/* Topic header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-5 flex items-start gap-4 hover:bg-[#FAF8F5] transition-colors"
      >
        <div className="flex-shrink-0 w-10 h-10 border-2 border-black bg-[#FFDE59] font-mono font-black text-black text-sm flex items-center justify-center shadow-[2px_2px_0px_#000]">
          {String(index + 1).padStart(2, '0')}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-black font-black text-base md:text-lg uppercase tracking-tight">
            {topic.title}
          </h4>
          <p className="text-gray-700 text-xs md:text-sm font-bold mt-1 leading-relaxed">
            {topic.description}
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            {topic.concepts.map((concept, ci) => (
              <span
                key={ci}
                className="px-2.5 py-0.5 bg-[#FAF8F5] border-2 border-black text-[11px] font-black uppercase text-black shadow-[1px_1px_0px_#000]"
              >
                {concept}
              </span>
            ))}
          </div>
        </div>
        <div className={`flex-shrink-0 p-1 bg-white border-2 border-black shadow-[1px_1px_0px_#000] transition-transform duration-300 ${expanded ? 'rotate-180 bg-[#CCFF00]' : ''}`}>
          <ChevronDown size={18} className="stroke-[3] text-black" />
        </div>
      </button>

      {/* Expanded code content */}
      {expanded && (
        <div className="border-t-3 border-black p-5 bg-[#FAF8F5]">
          <CodeBlock code={topic.code} language={langKey} />
        </div>
      )}
    </div>
  );
}

// ── Level section ──
function LevelSection({ module, langKey }) {
  const [collapsed, setCollapsed] = useState(false);
  const levelBadges = {
    Beginner: 'bg-[#CCFF00]',
    Intermediate: 'bg-[#FFDE59]',
    Advanced: 'bg-[#FF0033] text-white',
  };
  const badgeClass = levelBadges[module.level] || 'bg-[#00F0FF]';

  return (
    <div className="mb-10">
      {/* Level header */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center gap-3 mb-5 w-full text-left bg-white border-3 border-black p-3 shadow-[4px_4px_0px_#000] hover:bg-[#FAF8F5] transition-all cursor-pointer"
      >
        <div className={`flex items-center gap-2 px-3 py-1 border-2 border-black font-mono font-black text-xs uppercase shadow-[2px_2px_0px_#000] ${badgeClass}`}>
          <span>{module.icon}</span>
          <span>{module.level}</span>
        </div>
        <span className="text-xs font-black text-black uppercase">
          ({module.topics.length} MODULE TOPICS)
        </span>
        <div className="flex-1 h-0.5 bg-black ml-2" />
        <div className="p-1 bg-white border-2 border-black shadow-[1px_1px_0px_#000]">
          <ChevronRight
            size={16}
            className={`stroke-[3] text-black transition-transform duration-300 ${collapsed ? '' : 'rotate-90'}`}
          />
        </div>
      </button>

      {/* Topics */}
      {!collapsed && (
        <div className="space-y-4">
          {module.topics.map((topic, ti) => (
            <TopicCard
              key={ti}
              topic={topic}
              index={ti}
              langKey={langKey}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Notes Section Component ──
function NotesSection({ langKey }) {
  const [expandedChapter, setExpandedChapter] = useState(null);
  const [expandedSection, setExpandedSection] = useState({});
  const chapterRefs = useRef({});

  const notes = langKey === 'python' ? pythonNotes : null;
  if (!notes) {
    return (
      <div className="text-center py-16 bg-white border-4 border-black p-8 shadow-[6px_6px_0px_#000]">
        <FileText size={48} className="mx-auto mb-4 text-black stroke-[2.5]" />
        <h3 className="text-xl font-black text-black uppercase mb-2">NOTES COMPILATION IN PROGRESS</h3>
        <p className="text-xs font-bold text-gray-700 uppercase">
          Comprehensive curriculum notes for this language are currently being authored and verified.
        </p>
      </div>
    );
  }

  const toggleSection = (chapterId, sectionIdx) => {
    setExpandedSection(prev => ({
      ...prev,
      [`${chapterId}-${sectionIdx}`]: !prev[`${chapterId}-${sectionIdx}`]
    }));
  };

  const scrollToChapter = (chapterId) => {
    setExpandedChapter(expandedChapter === chapterId ? null : chapterId);
    if (chapterRefs.current[chapterId]) {
      chapterRefs.current[chapterId].scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div>
      {/* PDF Download Banner */}
      <div className="bg-white border-4 border-black p-6 mb-8 shadow-[6px_6px_0px_#000] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFDE59] border-2 border-black font-mono font-black text-xs uppercase mb-3 shadow-[2px_2px_0px_#000]">
            <FileText size={14} className="stroke-[2.5]" />
            <span>OFFICIAL CHEATSHEET & NOTES</span>
          </div>
          <h2 className="text-2xl font-black text-black uppercase tracking-tight mb-2">
            {notes.title}
          </h2>
          <p className="text-xs font-bold text-gray-700 uppercase max-w-2xl">{notes.subtitle}</p>
          <div className="flex items-center gap-4 mt-4">
            <span className="px-2.5 py-1 bg-[#FAF8F5] border-2 border-black text-xs font-black text-black uppercase">
              {notes.totalChapters} CHAPTERS
            </span>
            <span className="px-2.5 py-1 bg-[#FAF8F5] border-2 border-black text-xs font-black text-black uppercase">
              {notes.chapters.reduce((sum, ch) => sum + ch.sections.length, 0)} SECTIONS
            </span>
          </div>
        </div>
        <a
          href={notes.pdfUrl}
          download
          className="flex items-center gap-2 px-6 py-3 bg-[#00F0FF] hover:bg-[#33f3ff] border-3 border-black text-black font-black uppercase text-xs shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all whitespace-nowrap"
        >
          <Download size={16} className="stroke-[3]" />
          DOWNLOAD FULL PDF
        </a>
      </div>

      {/* Chapter Navigation */}
      <div className="flex flex-wrap gap-2 mb-8 p-4 bg-white border-3 border-black shadow-[4px_4px_0px_#000]">
        {notes.chapters.map((chapter) => (
          <button
            key={chapter.id}
            onClick={() => scrollToChapter(chapter.id)}
            className={`flex items-center gap-2 px-3.5 py-2 border-2 border-black text-xs font-black uppercase shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all ${
              expandedChapter === chapter.id
                ? 'bg-[#CCFF00] text-black'
                : 'bg-[#FAF8F5] hover:bg-white text-black'
            }`}
          >
            <span>{chapter.icon}</span>
            <span>{chapter.title}</span>
          </button>
        ))}
      </div>

      {/* Chapters */}
      <div className="space-y-6">
        {notes.chapters.map((chapter) => {
          const isExpanded = expandedChapter === chapter.id;

          return (
            <div
              key={chapter.id}
              ref={el => chapterRefs.current[chapter.id] = el}
              className="bg-white border-4 border-black shadow-[5px_5px_0px_#000] overflow-hidden"
            >
              {/* Chapter Header */}
              <button
                onClick={() => setExpandedChapter(isExpanded ? null : chapter.id)}
                className="w-full text-left p-6 flex items-start gap-4 hover:bg-[#FAF8F5] transition-colors"
              >
                <div className="w-12 h-12 border-3 border-black bg-[#FFDE59] flex items-center justify-center text-2xl shadow-[3px_3px_0px_#000] flex-shrink-0">
                  {chapter.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-black text-black uppercase tracking-tight">
                    {chapter.title}
                  </h3>
                  <p className="text-xs font-bold text-gray-700 uppercase mt-1 leading-relaxed">{chapter.summary}</p>
                  <div className="flex flex-wrap items-center gap-2 mt-3">
                    <span className="px-2.5 py-0.5 border-2 border-black bg-[#CCFF00] text-[10px] font-black uppercase text-black">
                      {chapter.difficulty}
                    </span>
                    <span className="px-2.5 py-0.5 border-2 border-black bg-[#FAF8F5] text-[10px] font-black uppercase text-black flex items-center gap-1">
                      <Clock size={12} className="stroke-[3]" />
                      {chapter.estimatedTime}
                    </span>
                    <span className="px-2.5 py-0.5 border-2 border-black bg-[#FAF8F5] text-[10px] font-black uppercase text-black">
                      {chapter.sections.length} SECTIONS
                    </span>
                  </div>
                </div>
                <div className={`p-1.5 bg-white border-2 border-black shadow-[1px_1px_0px_#000] transition-transform duration-300 ${isExpanded ? 'rotate-180 bg-[#00F0FF]' : ''}`}>
                  <ChevronDown size={20} className="stroke-[3] text-black" />
                </div>
              </button>

              {/* Chapter Content */}
              {isExpanded && (
                <div className="px-6 pb-6 pt-2 border-t-3 border-black bg-[#FAF8F5]">
                  <div className="space-y-4">
                    {chapter.sections.map((section, sIdx) => {
                      const sKey = `${chapter.id}-${sIdx}`;
                      const sExpanded = expandedSection[sKey] !== false;

                      return (
                        <div key={sIdx} className="bg-white border-3 border-black shadow-[3px_3px_0px_#000] overflow-hidden">
                          <button
                            onClick={() => toggleSection(chapter.id, sIdx)}
                            className="w-full text-left p-4 flex items-center gap-3 hover:bg-[#FAF8F5] transition-colors"
                          >
                            <div className="w-7 h-7 border-2 border-black bg-[#00F0FF] flex items-center justify-center text-xs font-black text-black">
                              {sIdx + 1}
                            </div>
                            <h4 className="text-black font-black uppercase text-sm flex-1 tracking-tight">
                              {section.heading}
                            </h4>
                            <ChevronDown
                              size={16}
                              className={`stroke-[3] text-black transition-transform duration-300 ${sExpanded ? 'rotate-180' : ''}`}
                            />
                          </button>

                          {sExpanded && (
                            <div className="px-4 pb-5 pt-2 border-t-2 border-black bg-white space-y-4">
                              <div className="text-black font-mono text-xs leading-relaxed whitespace-pre-line pl-10">
                                {section.explanation}
                              </div>
                              {section.code && (
                                <div className="pl-10">
                                  <CodeBlock code={section.code} language={langKey} />
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
//  MAIN COMPONENT
// ═══════════════════════════════════════════════════════
export default function LanguageFundamentals() {
  const [selectedLang, setSelectedLang] = useState(null);
  const [activeTab, setActiveTab] = useState('learn');
  const [searchQuery, setSearchQuery] = useState('');
  const topRef = useRef(null);

  useEffect(() => {
    if (selectedLang && topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedLang]);

  const curriculum = selectedLang ? languageCurriculum[selectedLang] : null;
  const LangIcon = selectedLang ? langIcons[selectedLang] : null;

  // ── Language Selection Grid ──
  if (!selectedLang) {
    return (
      <div className="p-6 md:p-10 max-w-7xl mx-auto w-full font-mono pb-20">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#FFDE59] border-2 border-black shadow-[3px_3px_0px_#000] text-black font-black text-xs uppercase tracking-wider mb-4">
            <GraduationCap size={16} className="stroke-[2.5]" />
            <span>[ SYSTEM PROTOCOL // LANGUAGE MASTERY ]</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-black uppercase tracking-tight mb-4 flex items-center flex-wrap gap-3">
            LANGUAGE
            <span className="bg-[#00F0FF] text-black px-3 py-1 border-4 border-black shadow-[5px_5px_0px_#000]">
              FUNDAMENTALS
            </span>
          </h1>

          <p className="text-xs md:text-sm font-bold text-gray-700 uppercase tracking-wide leading-relaxed bg-white border-2 border-black p-3 shadow-[3px_3px_0px_#000] max-w-3xl">
            // MASTER CORE PARADIGMS, MEMORY MODELS, RUNTIME CHARACTERISTICS, AND IDIOMATIC PATTERNS ACROSS PRODUCTION LANGUAGES.
          </p>
        </div>

        {/* Language Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {langKeys.map((key, idx) => {
            const lang = languageCurriculum[key];
            const Icon = langIcons[key];
            const totalTopics = lang.modules.reduce((sum, m) => sum + m.topics.length, 0);
            const accentBg = accentColors[idx % accentColors.length];

            return (
              <div
                key={key}
                className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_#000] hover:shadow-[10px_10px_0px_#000] hover:-translate-x-1 hover:-translate-y-1 transition-all text-left flex flex-col justify-between group"
              >
                <div>
                  {/* Icon + badges */}
                  <div className="flex justify-between items-start mb-5">
                    <div className={`w-14 h-14 border-3 border-black ${accentBg} flex items-center justify-center shadow-[3px_3px_0px_#000]`}>
                      <Icon size={28} className="text-black stroke-[2.5]" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="bg-white border-2 border-black px-2.5 py-1 text-[11px] font-black uppercase text-black shadow-[2px_2px_0px_#000]">
                        {totalTopics} TOPICS
                      </span>
                      <span className="bg-[#FAF8F5] border-2 border-black px-2.5 py-1 text-[11px] font-black uppercase text-black shadow-[2px_2px_0px_#000]">
                        {lang.cheatSheet.length} SNIPPETS
                      </span>
                    </div>
                  </div>

                  {/* Title + Tagline */}
                  <h2 className="text-2xl font-black text-black uppercase tracking-tight mb-1 group-hover:text-blue-600 transition-colors">
                    {lang.name}
                  </h2>
                  <p className="text-xs font-bold text-gray-600 uppercase mb-5 leading-relaxed">
                    {lang.tagline}
                  </p>

                  {/* Levels preview */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {lang.modules.map((mod, mi) => (
                      <span
                        key={mi}
                        className="px-2 py-0.5 border-2 border-black bg-[#FAF8F5] text-[10px] font-black uppercase text-black shadow-[1px_1px_0px_#000]"
                      >
                        {mod.icon} {mod.level}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Start Button */}
                <button
                  onClick={() => setSelectedLang(key)}
                  className="w-full py-3 bg-[#CCFF00] group-hover:bg-[#FFDE59] border-3 border-black text-black font-black uppercase text-xs tracking-wider text-center shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-2"
                >
                  <span>[ START LEARNING ]</span>
                  <ChevronRight size={16} className="stroke-[3]" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Info Banner */}
        <div className="bg-white border-4 border-black p-8 shadow-[6px_6px_0px_#000]">
          <div className="flex items-center gap-3 mb-4">
            <div className="px-3 py-1 bg-[#FFDE59] border-2 border-black font-black text-xs uppercase shadow-[2px_2px_0px_#000] flex items-center gap-2">
              <Sparkles size={14} className="stroke-[2.5]" />
              <span>[ CORE ARCHITECTURE ADVICE ]</span>
            </div>
            <h3 className="text-xl font-black text-black uppercase">WHY LANGUAGE FUNDAMENTALS MATTER</h3>
          </div>
          <p className="text-xs md:text-sm font-bold text-gray-700 uppercase leading-relaxed max-w-4xl">
            // ELITE ENGINEERING ROLES DEMAND DEEP UNDERSTANDING OF HOW CODE EXECUTES ON THE METAL.
            FROM JAVASCRIPT MICROTASK SCHEDULING AND V8 HIDDEN CLASSES, TO C++ MOVE SEMANTICS, RUST LIFETIME CONSTRAINTS,
            AND GO ROUTINE WORK-STEALING SCHEDULERS — MASTERY AT THIS LEVEL SEPARATES SENIOR ARCHITECTS FROM JUNIOR CODERS.
          </p>
        </div>
      </div>
    );
  }

  // ── Learning View (Individual Language selected) ──
  return (
    <div ref={topRef} className="p-4 md:p-8 max-w-7xl mx-auto w-full font-mono pb-20">
      {/* Top navigation bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-white border-4 border-black p-4 shadow-[5px_5px_0px_#000]">
        <div className="flex items-center gap-4 flex-wrap">
          <button
            onClick={() => {
              setSelectedLang(null);
              setActiveTab('learn');
              setSearchQuery('');
            }}
            className="flex items-center gap-2 px-3 py-2 bg-white hover:bg-[#FFDE59] border-2 border-black font-black text-xs uppercase shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all"
          >
            <ArrowLeft size={16} className="stroke-[3]" />
            <span>ALL LANGUAGES</span>
          </button>

          {/* Language Badge */}
          <div className="flex items-center gap-2.5 px-3 py-1.5 bg-[#FFDE59] border-2 border-black text-black shadow-[2px_2px_0px_#000]">
            <LangIcon size={18} className="stroke-[2.5]" />
            <span className="font-black text-sm uppercase">{curriculum.name}</span>
          </div>

          {/* Tabs */}
          <div className="flex border-2 border-black shadow-[2px_2px_0px_#000] overflow-hidden bg-white">
            <button
              onClick={() => setActiveTab('learn')}
              className={`flex items-center gap-2 px-4 py-1.5 text-xs font-black uppercase transition-all ${
                activeTab === 'learn'
                  ? 'bg-[#00F0FF] text-black'
                  : 'bg-white hover:bg-[#FAF8F5] text-black'
              }`}
            >
              <BookOpen size={14} className="stroke-[2.5]" />
              LEARN
            </button>
            <button
              onClick={() => setActiveTab('cheatsheet')}
              className={`flex items-center gap-2 px-4 py-1.5 text-xs font-black uppercase border-l-2 border-black transition-all ${
                activeTab === 'cheatsheet'
                  ? 'bg-[#CCFF00] text-black'
                  : 'bg-white hover:bg-[#FAF8F5] text-black'
              }`}
            >
              <FileCode2 size={14} className="stroke-[2.5]" />
              CHEAT SHEET
            </button>
            <button
              onClick={() => setActiveTab('notes')}
              className={`flex items-center gap-2 px-4 py-1.5 text-xs font-black uppercase border-l-2 border-black transition-all ${
                activeTab === 'notes'
                  ? 'bg-[#FF52D9] text-black'
                  : 'bg-white hover:bg-[#FAF8F5] text-black'
              }`}
            >
              <FileText size={14} className="stroke-[2.5]" />
              NOTES
            </button>
          </div>
        </div>

        {/* Search */}
        {activeTab === 'learn' && (
          <div className="relative w-full md:w-72">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-black stroke-[3]" />
            <input
              type="text"
              placeholder="SEARCH TOPICS..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#FAF8F5] border-2 border-black pl-9 pr-8 py-2 text-xs font-black uppercase text-black placeholder-gray-500 shadow-[2px_2px_0px_#000] focus:outline-none focus:bg-white"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-black hover:text-red-500"
              >
                <X size={14} className="stroke-[3]" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Quick Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          {
            icon: Layers,
            label: 'MODULES',
            value: curriculum.modules.length,
            bg: 'bg-[#FFDE59]',
          },
          {
            icon: Code2,
            label: 'CURRICULUM TOPICS',
            value: curriculum.modules.reduce((s, m) => s + m.topics.length, 0),
            bg: 'bg-[#00F0FF]',
          },
          {
            icon: Hash,
            label: 'CHEAT SNIPPETS',
            value: curriculum.cheatSheet.length,
            bg: 'bg-[#CCFF00]',
          },
          {
            icon: Zap,
            label: 'CODE EXAMPLES',
            value: curriculum.modules.reduce((s, m) => s + m.topics.length, 0),
            bg: 'bg-[#FF52D9]',
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white border-3 border-black p-4 shadow-[4px_4px_0px_#000] flex items-center gap-3"
          >
            <div className={`w-10 h-10 border-2 border-black ${stat.bg} flex items-center justify-center shadow-[2px_2px_0px_#000]`}>
              <stat.icon size={20} className="stroke-[2.5] text-black" />
            </div>
            <div>
              <div className="text-xl font-black text-black leading-none mb-1">{stat.value}</div>
              <div className="text-[10px] font-black text-gray-600 uppercase">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── LEARN TAB ── */}
      {activeTab === 'learn' && (
        <div>
          {curriculum.modules.map((mod, mi) => {
            const filteredTopics = searchQuery
              ? mod.topics.filter(
                  (t) =>
                    t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    t.concepts.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()))
                )
              : mod.topics;

            if (searchQuery && filteredTopics.length === 0) return null;

            return (
              <LevelSection
                key={mi}
                module={{ ...mod, topics: filteredTopics }}
                langKey={selectedLang}
              />
            );
          })}
        </div>
      )}

      {/* ── CHEAT SHEET TAB ── */}
      {activeTab === 'cheatsheet' && (
        <div>
          <div className="flex items-center justify-between mb-6 bg-white border-3 border-black p-4 shadow-[4px_4px_0px_#000]">
            <div>
              <h2 className="text-xl font-black text-black uppercase">
                {curriculum.name} QUICK SYNTAX REFERENCE
              </h2>
              <span className="text-xs font-bold text-gray-700 uppercase">
                COPY-PASTE READY INTERVIEW TEMPLATES AND IDIOMS
              </span>
            </div>
            <span className="px-3 py-1 bg-[#CCFF00] border-2 border-black font-black text-xs uppercase shadow-[2px_2px_0px_#000]">
              {curriculum.cheatSheet.length} SNIPPETS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {curriculum.cheatSheet.map((item, i) => (
              <CheatSheetCard
                key={i}
                label={item.label}
                syntax={item.syntax}
              />
            ))}
          </div>
        </div>
      )}

      {/* ── NOTES TAB ── */}
      {activeTab === 'notes' && (
        <NotesSection langKey={selectedLang} />
      )}
    </div>
  );
}