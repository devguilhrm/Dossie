// Uma questão, um assunto principal. Cada denominador permanece visível.
function caminhoInvencivel(rs) {
  rankData = [];
  const base = universe(), confirmed = rs.filter(ok);
  if (!base.length) return '<section class="card empty">Escolha seus concursos e uma combinação com provas disponíveis.</section>';
  const exams = [...new Set(base.map(r => r.prova))];
  const subjects = aggregate(confirmed, r => r.materia);
  const excluded = base.filter(r => !ok(r)).length;
  return `<section class="path-intro card"><span class="eyebrow">SEU CAMINHO INVENCÍVEL</span><h2>Um assunto de cada vez.</h2><p>Comece pelas matérias e subtópicos que mais apareceram na sua seleção. Abra cada matéria para comparar as provas e consultar as questões.</p><div class="path-numbers"><div><b>${subjects.length}</b><span>matérias no filtro</span></div><div><b>${confirmed.length}</b><span>questões confirmadas</span></div><div><b>${exams.length}</b><span>provas selecionadas</span></div></div><p class="caption">${excluded} questões fora do escopo ou com classificação pendente ficam fora do ranking. Frequência histórica não é previsão da próxima prova.</p></section>
  ${subjects.length ? `<div class="path-map">${subjects.map(([subject, items], index) => {
    const subjectBase = base.filter(r => ok(r) && r.materia === subject);
    const groups = aggregate(items, r => r.codigo + '|||' + r.recorte_consolidado);
    const leader = groups[0][0].split('|||')[1];
    const perExam = exams.map(exam => {
      const all = base.filter(r => r.prova === exam);
      const count = subjectBase.filter(r => r.prova === exam).length;
      return `<span class="path-proof"><b>${esc(names[exam])}</b><span>${count} questões · ${fmt(count, all.length)} da prova</span></span>`;
    }).join('');
    return `<details class="path-subject" ${$('#subject').value ? 'open' : ''}><summary><span class="path-position">${index + 1}</span><span class="path-subject-name"><strong>${esc(subject)}</strong><small>Mais cobrado: ${esc(leader)}</small></span><span class="path-total"><b>${items.length}</b><small>questões</small></span></summary><div class="path-body"><div class="path-proofs">${perExam}</div><p class="caption">Percentual da matéria: questões do subtópico ÷ questões confirmadas desta matéria em cada prova. A busca reduz os resultados, mas preserva essa base.</p>${groups.map(([key, values], position) => {
      const id = rankData.push([key, values]) - 1;
      return `<article class="path-topic"><div class="path-topic-head"><span class="path-position">${position + 1}</span><button class="link-button" data-rank="${id}">${esc(key.split('|||')[1])}</button><b>${values.length} questões</b></div><div class="table-wrap"><table><thead><tr><th>Prova / cargo</th><th>Banca</th><th class="num">Questões</th><th class="num">% da matéria</th><th class="num">% da prova</th></tr></thead><tbody>${exams.map(exam => {
        const all = base.filter(r => r.prova === exam), examRows = values.filter(r => r.prova === exam);
        const denominator = subjectBase.filter(r => r.prova === exam).length;
        return `<tr><td>${esc(names[exam])}<span class="cell-sub">${esc(examRows.map(r => 'Q' + r.q).join(', ') || (denominator ? 'Sem ocorrência neste subtópico' : 'Sem questão confirmada da matéria'))}</span></td><td>${esc(all[0].banca)}</td><td class="num">${examRows.length}</td><td class="num">${fmt(examRows.length, denominator)}</td><td class="num">${fmt(examRows.length, all.length)}</td></tr>`;
      }).join('')}</tbody></table></div></article>`;
    }).join('')}</div></details>`;
  }).join('')}</div>` : '<section class="card empty">Nenhuma questão confirmada para esta matéria ou busca.</section>'}`;
}
