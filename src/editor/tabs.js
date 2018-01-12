import m from 'mithril'
import b from 'bss'

export default (model, actions) =>
  m('nav'
    + b
      .minHeight(38)
      .d('flex')
      .c('gray')
      .w('100%')
      .background('rgb(246,246,246)')
      .fontSize(14)
    ,
    m('.tabs'
      + b.d('flex')
        .minHeight(38)
        .overflowX('auto')
        .overflowY('hidden')
        .flexGrow(1)
      ,
        model.state.fileTabs && fileTabs(model, actions)
      ,
        model.state.linkTabs && linkTabs(model, actions)
    )
  )

function linkTabs(model, actions) {
  return model.state.links.map(link =>
    tab(
      m('a' + b.c('inherit'), {
        href: link.url,
        target: '_blank',
        onclick: e => model.linkContent[link.url] && e.preventDefault()
      }, link.name),
      () => model.linkContent[link.url] && actions.select(link.url),
      link === model.selectedFile(),
      model
    )
  )
}

function fileTabs(model, actions) {
  return model.state.files.map(file =>
    tab(
      file.name,
      () => actions.select(file.name),
      file === model.selectedFile(),
      model
    )
  )
}

function tab(title, onclick, selected, model) {
  return m('.tab'
   + b.d('flex')
    .ai('center')
    .transition('all 0.3s')
    .minWidth(40)
    .maxWidth(200)
    .cursor('pointer')
    .flexShrink(2)
    .background('rgb(246,246,246)')
    .$hover(
      b
      .flexShrink(0)
      .background('#ddd')
      .c('#333')
    )
  , {
    style: selected
      ? b
      .background(model.state.color)
      .c('white')
      .flexShrink(0)
      .style
      : {},
    onclick: onclick
  },
    m('span'
      + b.flexGrow(1)
      .overflow('hidden')
      .ta('center')
      .whiteSpace('nowrap')
      .p('0 12px')
    ,
      title
    )
  )
}
