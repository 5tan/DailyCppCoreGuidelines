var fs = require("fs"),
  execSync = require("child_process").execSync,
  path = "", // path to CppCoreGuidelines repository
  str = "", // string data
  content = "", // main content with guidelines to get
  sections = [], // content devided into sections
  guidelines = [], // extracted guidelines
  commit = "",
  date = "";

path = process.argv[2];
commit = execSync('git --git-dir ' + path + '/.git log -1 --format="%H"').toString().trim();
date = execSync('git --git-dir ' + path + '/.git log -1 --format="%cd"').toString().trim();
str = fs.readFileSync( path +'/CppCoreGuidelines.md', 'utf8').toString();
content = str.match(/(# <a name=\"S-philosophy\"><\/a>P: Philosophy\s*).*?(?=\s*# <a name=\"S-glossary\"><\/a>Glossary)/gs)[0]; // from [Philisopy to Glossary)
sections = (content + "\n# <a name=\"S-").match(/(^# <a name=\"S-\s*).*?(?=\s*^# <a name=\"S-)/gsm); // added last tag, to make regex simpler
sections.forEach(function(s, i, array) {
  var tmp = (s + (i + 1 == array.length ? "\n### <a name=\"" : "")).match(/(^### <a name=\"\s*).*?(?=\s*^### <a name=\")/gsm);
  if (tmp == null) return;
  tmp.forEach(function(g) { guidelines.push(g); });
});

console.log(
  "g_guidelines=" + JSON.stringify(guidelines) + ";" +
  "g_commit=\"" + commit + "\";" +
  "g_date=\"" + date + "\";");
