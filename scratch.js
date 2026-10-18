const keywords = "import|from|def|class|return|if|elif|else|for|while|in|not|and|or|try|except|finally|raise|with|as|yield|async|await|pass|break|continue|lambda|is|None|True|False|self|super|global|nonlocal|public|private|protected|static|final|abstract|interface|implements|extends|void|new|this|throw|throws|catch|switch|case|default|package|func|struct|type|var|let|const|function|export|constructor|override|virtual|template|typename|namespace|using|include|constexpr|noexcept|nullptr|auto|make|chan|go|defer|select|range|map|nil|iota".split('|');
const types = "int|float|double|string|bool|boolean|char|byte|short|long|String|Integer|Double|Float|Boolean|List|Map|Set|Array|ArrayList|HashMap|HashSet|Optional|vector|set|stack|queue|error|context|any".split('|');
const builtins = "print|len|sum|min|max|list|dict|set|tuple|type|id|super|Exception|ValueError|TypeError".split('|');

const highlightCode = (raw) => {
    if (!raw) return '';
    const escaped = raw
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
      
    // Order matters! Strings -> Comments -> Decorators -> Numbers -> Functions -> Words
    const regex = /("""[\s\S]*?"""|'''[\s\S]*?'''|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`[^`]*`)|(\/\/.*|#.*)|(@\w+)|(\b\d+\.?\d*[fLn]?\b)|([a-zA-Z_]\w*(?=\s*\())|([a-zA-Z_]\w*)/gm;
    
    return escaped.replace(regex, (match, stringMatch, commentMatch, decoratorMatch, numberMatch, functionMatch, wordMatch) => {
        if (stringMatch) return `<span class="text-brand-green">${stringMatch}</span>`;
        if (commentMatch) return `<span class="text-gray-500 italic">${commentMatch}</span>`;
        if (decoratorMatch) return `<span class="text-yellow-300">${decoratorMatch}</span>`;
        if (numberMatch) return `<span class="text-amber-400">${numberMatch}</span>`;
        if (functionMatch) return `<span class="text-blue-300">${functionMatch}</span>`;
        if (wordMatch) {
            if (keywords.includes(wordMatch)) return `<span class="text-purple-400 font-medium">${wordMatch}</span>`;
            if (types.includes(wordMatch)) return `<span class="text-sky-400">${wordMatch}</span>`;
            if (builtins.includes(wordMatch)) return `<span class="text-sky-300">${wordMatch}</span>`;
        }
        return match;
    });
};

console.log(highlightCode('class Dog:\n    # Comment\n    age = 400\n    print(age)'));
console.log(highlightCode('name = "400 class text"'));
