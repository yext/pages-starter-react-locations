import { getLocalDataManifest } from "../ssr/getLocalData.js";
import index from "../public/index";
import {
  dynamicModeInfoText,
  generateTestDataWarningText,
  localModeInfoText,
  noLocalDataErrorText,
  viteDevServerPort
} from "./constants.js";
const indexPage = ({
  dynamicGenerateData,
  displayGenerateTestDataWarning
}) => async (req, res, next) => {
  try {
    const localDataManifest = await getLocalDataManifest();
    let indexPageHtml = index.replace(
      `<!--info-html-->`,
      `<div class="info">
          <i class="fa fa-info-circle"></i>
          ${dynamicGenerateData ? dynamicModeInfoText : localModeInfoText}
        </div>`
    );
    if (localDataManifest.static.length + localDataManifest.entity.size) {
      if (localDataManifest.static.length) {
        indexPageHtml = indexPageHtml.replace(
          `<!--static-pages-html-->`,
          `<div class="section-title">Static Pages</div>
          <div class="list">
          ${Array.from(localDataManifest.static).reduce(
            (templateAccumulator, templateName) => templateAccumulator + `<div class="list-title"> <span class="list-title-templateName">${templateName}</span> Pages (1):</div>
            <ul>
              <li>
                <a href="http://localhost:${viteDevServerPort}/${encodeURIComponent(
              templateName
            )}/">
                  ${templateName}
                </a>
              </li>
            </ul>`,
            ""
          )}
          </div>
          `
        );
      }
      if (Array.from(localDataManifest.entity.keys()).length) {
        indexPageHtml = indexPageHtml.replace(
          `<!--entity-pages-html-->`,
          `<div class="section-title">Entity Pages</div>
            <div class="list">
          ${Array.from(localDataManifest.entity.keys()).reduce(
            (templateAccumulator, templateName) => templateAccumulator + `<div class="list-title"> <span class="list-title-templateName">${templateName}</span> Pages (${(localDataManifest.entity.get(templateName) || []).length}):</div>
            <ul>
              ${Array.from(
              localDataManifest.entity.get(templateName) || []
            ).reduce(
              (entityAccumulator, entityId) => entityAccumulator + `<li>
                    <a href="http://localhost:${viteDevServerPort}/${encodeURIComponent(
                templateName
              )}/${entityId}">
                      ${entityId}
                    </a>
                  </li>`,
              ""
            )}
            </ul>`,
            ""
          )}
          </div>`
        );
      }
    } else {
      indexPageHtml = indexPageHtml.replace(
        `<!--error-html-->`,
        `<div class="error">
           <i class="fa fa-times-circle"></i>
             ${noLocalDataErrorText}
          </div>`
      );
    }
    if (displayGenerateTestDataWarning) {
      indexPageHtml = indexPageHtml.replace(
        `<!--warning-html-->`,
        `<div class="warning">
          <i class="fa fa-warning"></i>
          ${generateTestDataWarningText} 
        </div>`
      );
    }
    res.status(200).set({ "Content-Type": "text/html" }).end(indexPageHtml);
  } catch (e) {
    next(e);
  }
};
export {
  indexPage
};
