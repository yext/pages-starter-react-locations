import escapeHtml from "escape-html";
import Convert from "ansi-to-html";
import page500 from "../public/500";
import colors from "picocolors";
const STACK_HTML_TAG = "{stack}";
const TITLE_HTML_TAG = "{title}";
const STATUS_CODE_HTML_TAG = "{statusCode}";
const ERROR_HTML_TAG = /\{error\}/g;
const DOUBLE_SPACE_REGEXP = "/ {2}/g";
const NEW_LINE_REGEXP = "/\n/g";
const errorMiddleware = (vite) => async (err, req, res, next) => {
  try {
    vite.ssrFixStacktrace(err);
    console.error(colors.red(err.toString()));
    const errorString = err.stack ? String(err.stack) : err.toString();
    const canInspect = !err.stack && String(err) === toString.call(err);
    const topLevelError = !canInspect ? escapeHtmlBlock(errorString.split("\n", 1)[0] || "Error") : "Error";
    const stackTrace = !canInspect ? String(errorString).split("\n").slice(1) : [errorString];
    const ansiToHtmlConverter = new Convert({ fg: "#000", bg: "#FFF" });
    const escapedStackTrace = stackTrace.map(
      (unescapedLine) => "<li>" + ansiToHtmlConverter.toHtml(escapeHtmlBlock(unescapedLine)) + "</li>"
    ).join("");
    const htmlResponseString = page500.replace(STACK_HTML_TAG, escapedStackTrace).replace(TITLE_HTML_TAG, "Error 500").replace(STATUS_CODE_HTML_TAG, "500").replace(ERROR_HTML_TAG, topLevelError);
    res.status(500).end(
      await vite.transformIndexHtml(req.originalUrl, htmlResponseString)
    );
  } catch (e) {
    console.error(e);
    next(e);
  }
};
const escapeHtmlBlock = (inputString) => {
  return escapeHtml(inputString).replace(DOUBLE_SPACE_REGEXP, " &nbsp;").replace(NEW_LINE_REGEXP, "<br>");
};
export {
  errorMiddleware
};
