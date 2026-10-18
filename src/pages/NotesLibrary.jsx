import { useState, useRef } from 'react';
import { Download, Eye, FileText, Bookmark, X, ChevronLeft, ChevronRight, Search, Sparkles, BookOpen } from 'lucide-react';
import { notesCategories, notesLibrary } from '../data/notesData';

export default function NotesLibrary() {
  const [viewingPdf, setViewingPdf] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 200, behavior: 'smooth' });
    }
  };

  const filtered = notesLibrary.filter((note) => {
    const matchCategory = activeCategory === 'all' || note.category === activeCategory;
    const matchSearch =
      !searchQuery ||
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      note.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const activeCat = notesCategories.find((c) => c.id === activeCategory);

  return (
    <div className="flex h-full flex-col overflow-y-auto custom-scrollbar font-mono pb-20">
      <div className="p-6 md:p-10 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="mb-10 flex justify-between items-start md:items-end flex-wrap gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#FFDE59] border-2 border-black shadow-[3px_3px_0px_#000] text-black font-black text-xs uppercase tracking-wider mb-4">
              <BookOpen size={14} className="stroke-[2.5]" />
              <span>[ KNOWLEDGE ARCHIVE // NOTES VAULT ]</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-black tracking-tight mb-4 flex items-center flex-wrap gap-3">
              NOTES
              <span className="bg-[#00F0FF] text-black px-3 py-1 border-4 border-black shadow-[5px_5px_0px_#000]">
                LIBRARY
              </span>
            </h1>

            <p className="text-xs md:text-sm font-bold text-gray-700 max-w-3xl uppercase tracking-wide leading-relaxed bg-white border-2 border-black p-3 shadow-[3px_3px_0px_#000]">
              // CURATED HIGH-YIELD PDFS, CS CHEAT SHEETS, AND HANDWRITTEN REVISION MANUALS BY SYSTEM DESIGN EXPERTS AND FAANG TOP TALENT.
            </p>
          </div>

          <button 
            onClick={() => alert("Note upload pipeline active. Contact system administrator or submit pull request.")}
            className="bg-[#CCFF00] hover:bg-[#FFDE59] border-3 border-black text-black px-6 py-3 font-black text-xs uppercase shadow-[4px_4px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center gap-2"
          >
            <FileText size={16} className="stroke-[2.5]" />
            <span>[ + UPLOAD NOTES ]</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-black stroke-[3]" />
          <input
            type="text"
            placeholder="SEARCH NOTES BY TITLE, TOPIC TAG, OR CONTRIBUTOR AUTHOR..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border-3 border-black pl-12 pr-4 py-3 text-xs md:text-sm font-black text-black placeholder-gray-500 uppercase focus:bg-yellow-50 focus:outline-none shadow-[4px_4px_0px_#000]"
          />
        </div>

        {/* Category Filter Bar */}
        <div className="relative mb-8 flex items-center gap-2">
          <button
            onClick={() => scroll(-1)}
            className="w-10 h-10 bg-white border-3 border-black flex items-center justify-center text-black font-black shadow-[3px_3px_0px_#000] hover:bg-[#FFDE59] active:translate-x-0.5 active:translate-y-0.5 transition-all flex-shrink-0"
          >
            <ChevronLeft size={18} className="stroke-[3]" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-2.5 overflow-x-auto scrollbar-hide py-1 flex-1"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {notesCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex-shrink-0 px-4 py-2 border-2 border-black text-xs font-black uppercase transition-all shadow-[2px_2px_0px_#000] whitespace-nowrap active:translate-x-0.5 active:translate-y-0.5 ${
                  activeCategory === cat.id
                    ? 'bg-[#FFDE59] text-black shadow-[3px_3px_0px_#000]'
                    : 'bg-white text-gray-700 hover:bg-[#F0EDE6]'
                }`}
              >
                {cat.emoji} {cat.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => scroll(1)}
            className="w-10 h-10 bg-white border-3 border-black flex items-center justify-center text-black font-black shadow-[3px_3px_0px_#000] hover:bg-[#FFDE59] active:translate-x-0.5 active:translate-y-0.5 transition-all flex-shrink-0"
          >
            <ChevronRight size={18} className="stroke-[3]" />
          </button>
        </div>

        {/* Section Title */}
        <div className="flex items-center justify-between gap-3 mb-6 bg-white border-3 border-black p-3 shadow-[4px_4px_0px_#000]">
          <div className="flex items-center gap-2">
            <span className="text-xl">{activeCat?.emoji}</span>
            <h2 className="text-sm md:text-base font-black text-black uppercase">
              CATEGORY: {activeCat?.label}
            </h2>
          </div>
          <span className="text-xs font-black text-black bg-[#CCFF00] border-2 border-black px-2.5 py-0.5 shadow-[1px_1px_0px_#000]">
            {filtered.length} {filtered.length === 1 ? 'FILE' : 'FILES'}
          </span>
        </div>

        {/* Notes Grid */}
        {filtered.length === 0 ? (
          <div className="bg-white border-4 border-black p-12 text-center shadow-[6px_6px_0px_#000]">
            <p className="text-sm font-black text-black uppercase mb-3">NO NOTES RECORDED IN THIS CATEGORY OR MATCHING QUERY.</p>
            <button
              onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
              className="px-4 py-2 bg-[#CCFF00] border-2 border-black text-xs font-black uppercase shadow-[3px_3px_0px_#000]"
            >
              [ RESET SEARCH & SHOW ALL ]
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((note, i) => (
              <div
                key={`${note.category}-${i}`}
                className="bg-white border-4 border-black shadow-[6px_6px_0px_#000] hover:shadow-[10px_10px_0px_#000] hover:-translate-x-1 hover:-translate-y-1 transition-all flex flex-col justify-between group overflow-hidden"
              >
                {/* Notebook Cover */}
                <div className="h-44 bg-[#FBF9F5] border-b-3 border-black relative flex flex-col justify-between p-4">
                  <div
                    className="w-full h-full bg-white border-2 border-black p-3.5 flex flex-col justify-between shadow-[2px_2px_0px_#000]"
                    style={{ borderLeftWidth: '6px', borderLeftColor: note.accent || '#000' }}
                  >
                    <div>
                      <h2 className="text-sm font-black text-black uppercase leading-tight line-clamp-2">{note.title}</h2>
                      <p className="text-[11px] font-bold text-gray-600 mt-1 line-clamp-2 uppercase">{note.description}</p>
                    </div>
                    <div className="flex items-center justify-between mt-auto pt-2">
                      <span className="text-[10px] font-black uppercase px-1.5 py-0.5 bg-black text-white">
                        DOC
                      </span>
                      <span className="text-xs font-black text-black font-mono">
                        {note.pages} PG
                      </span>
                    </div>
                  </div>

                  {note.pdfUrl && (
                    <div className="absolute top-2 right-2 px-2 py-0.5 bg-[#CCFF00] border border-black text-[9px] font-black uppercase tracking-wider shadow-[1px_1px_0px_#000]">
                      PDF READY
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-black text-black uppercase mb-1 group-hover:text-blue-600 transition-colors leading-snug line-clamp-2">
                      {note.title}
                    </h3>
                    <p className="text-[11px] font-bold text-gray-600 uppercase mb-3">
                      BY {note.author} • {note.views} VIEWS
                    </p>

                    <div className="flex gap-1.5 flex-wrap mb-4">
                      {note.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 border border-black bg-[#F0EDE6] text-[10px] font-black text-black uppercase shadow-[1px_1px_0px_#000]"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-3 border-t-2 border-black mt-auto">
                    {note.pdfUrl ? (
                      <a
                        href={note.pdfUrl}
                        download
                        className="flex-1 py-2 bg-[#CCFF00] hover:bg-[#FFDE59] border-2 border-black text-black font-black text-xs uppercase flex items-center justify-center gap-1 shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
                      >
                        <Download size={14} className="stroke-[2.5]" />
                        <span>PDF</span>
                      </a>
                    ) : (
                      <button className="flex-1 bg-gray-100 border-2 border-black text-gray-500 font-black py-2 text-xs uppercase cursor-not-allowed">
                        COMING SOON
                      </button>
                    )}

                    {note.pdfUrl ? (
                      <button
                        onClick={() => setViewingPdf(note)}
                        className="flex-1 bg-white hover:bg-[#00F0FF] border-2 border-black text-black font-black py-2 text-xs uppercase flex items-center justify-center gap-1 shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
                      >
                        <Eye size={14} className="stroke-[2.5]" />
                        <span>VIEW</span>
                      </button>
                    ) : (
                      <div className="flex-1 bg-white border-2 border-black text-black font-black py-2 text-xs uppercase flex items-center justify-center gap-1 shadow-[1px_1px_0px_#000]">
                        <Eye size={14} className="stroke-[2.5]" />
                        <span>{note.views}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PDF Viewer Modal */}
        {viewingPdf && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-8">
            <div className="bg-white border-4 border-black w-full max-w-5xl h-[90vh] flex flex-col overflow-hidden shadow-[12px_12px_0px_#000]">
              <div className="flex items-center justify-between px-6 py-4 border-b-3 border-black bg-[#FFDE59]">
                <div>
                  <h3 className="text-base font-black text-black uppercase">{viewingPdf.title}</h3>
                  <p className="text-xs font-bold text-gray-800 uppercase">
                    CONTRIBUTOR: {viewingPdf.author} • {viewingPdf.pages} PAGES
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href={viewingPdf.pdfUrl}
                    download
                    className="bg-[#CCFF00] hover:bg-black hover:text-white border-2 border-black text-black font-black px-4 py-2 text-xs uppercase shadow-[2px_2px_0px_#000] flex items-center gap-1.5 transition-colors"
                  >
                    <Download size={14} className="stroke-[2.5]" /> DOWNLOAD
                  </a>
                  <button
                    onClick={() => setViewingPdf(null)}
                    className="w-9 h-9 bg-white hover:bg-[#FF0033] hover:text-white border-2 border-black text-black font-black flex items-center justify-center shadow-[2px_2px_0px_#000] transition-colors"
                  >
                    <X size={18} className="stroke-[3]" />
                  </button>
                </div>
              </div>
              <div className="flex-1 bg-gray-100 p-2">
                <iframe src={viewingPdf.pdfUrl} title={viewingPdf.title} className="w-full h-full border-2 border-black" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}