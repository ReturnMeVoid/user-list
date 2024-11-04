/** @type {import('stylelint').Config} */
export default {
   extends: [
      "stylelint-config-standard-scss",
      "stylelint-config-html",
      "stylelint-config-recess-order",
   ],
   rules: {
      "value-keyword-case": null,
      "comment-empty-line-before": null,
      "selector-pseudo-class-no-unknown": null,
      "scss/double-slash-comment-empty-line-before": null,
      "selector-class-pattern": /^([a-z][a-z0-9]*)([-_]{1,2}[a-z0-9]+)*$/,
   },
}
