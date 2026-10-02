# Landing page — Lucas Fernandes Personal

Abra `index.html` no navegador. A página é estática e não precisa de instalação.

Os botões de contato levam diretamente ao WhatsApp (+55 32 9184-3587) e ao Instagram (@lucasferpersonal). A galeria está usando as imagens ilustrativas fornecidas; troque-as por fotos reais dos alunos quando disponíveis. Os cards de depoimento são espaços reservados para relatos reais. A seção de resultados traz molduras de antes e depois para inserir comparativos reais autorizados pelos alunos.

As imagens usadas estão em `images/`. As fontes Barlow Condensed e DM Sans são carregadas do Google Fonts; sem conexão, entram fontes de sistema como alternativa.
A estrutura visual ganhou uma faixa de dados reais do acompanhamento após o hero e depoimentos em cartões horizontais no celular, inspirados no site de referência.

## Versão 2
- Imagens convertidas para WebP (de ~4,2 MB para uma fração disso); os originais continuam no histórico do Git.
- Novo quiz "Qual formato combina com você?": as respostas viram uma mensagem pronta para o WhatsApp.
- SEO: dados estruturados de negócio local + FAQ, favicon.
- Barra de progresso de leitura, contadores animados e foco visível no teclado.
- As seções **Depoimentos** e **Resultados** ficam ocultas (`hidden`) até haver conteúdo real e autorizado. Para exibir, remova o atributo `hidden` da `<section>` e recoloque os links no menu.

## Versão 3 — design "Cinema"
Nova direção visual: o site como um filme (letterbox que se abre no carregamento, ficha técnica, "cenas" para o passo a passo, rolo de fotos e créditos finais). Paleta teal e âmbar; fontes Big Shoulders Display e Newsreader. O quiz do WhatsApp, as seções ocultas de depoimentos/resultados e o SEO da v2 foram mantidos.

### Antes e depois
Seção `#resultados`: fila rolável igual à galeria, fotos puras, sem efeitos. Para acrescentar, copie um bloco `<figure>` no `index.html` e troque a imagem (WebP em `images/`). Só publique imagens com autorização por escrito do aluno (LGPD).
