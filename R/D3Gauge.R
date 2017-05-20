#' <Add Title>
#'
#' <Add Description>
#'
#' @import htmlwidgets
#'
#' @export
D3Gauge <- function(value, color1= "#007EA7", color2= "#d9d9d9",title="Title of gauge",title2=" ", width = NULL, height = NULL, elementId = NULL) {

  # forward options using x
  x = list(
    value=value,
    color1=color1,
    color2=color2,
    title1=title,
    title2=title2
  )

  # create widget
  htmlwidgets::createWidget(
    name = 'D3Gauge',
    x,
    width = width,
    height = height,
    package = 'xaperid3js',
    elementId = elementId
  )
}

#' Shiny bindings for D3Gauge
#'
#' Output and render functions for using D3item within Shiny
#' applications and interactive Rmd documents.
#'
#' @param outputId output variable to read from
#' @param width,height Must be a valid CSS unit (like \code{'100\%'},
#'   \code{'400px'}, \code{'auto'}) or a number, which will be coerced to a
#'   string and have \code{'px'} appended.
#' @param expr An expression that generates a D3item
#' @param env The environment in which to evaluate \code{expr}.
#' @param quoted Is \code{expr} a quoted expression (with \code{quote()})? This
#'   is useful if you want to save an expression in a variable.
#'
#' @name D3item-shiny
#'
#' @export
D3GaugeOutput <- function(outputId, width = '100%', height = '400px'){
  htmlwidgets::shinyWidgetOutput(outputId, 'D3Gauge', width, height, package = 'xaperid3js')
}

#' @rdname D3item-shiny
#' @export
renderD3Gauge <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  htmlwidgets::shinyRenderWidget(expr, D3GaugeOutput, env, quoted = TRUE)
}
