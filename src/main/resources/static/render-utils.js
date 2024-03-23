(function (win) {
    if (win.vditorRender) return;

    const THEME_PREFIX="/plugins/vditor-mde/assets/static/themes"
    const CDN = "https://cdn.jsdelivr.net/npm/vditor@3.9.9"

    /** 拓展处理 ({dark}) => void */
    let functionList = []
    let darkMode = false

    /**
     * 处理渲染
     * @param func
     */
    function addExternal(func) {
        functionList.push(func)
    }

    /**
     * 设置暗色模式
     * @param {Boolean} dark
     */
    function setDarkMode(dark = false) {
        darkMode = dark
    }

    /**
     * 设置CDN
     * @param {string} cdn CDN
     */
    function setCDN(cdn) {
        this.CDN = cdn;
    }

    /**
     * 渲染
     * @param elId 搜寻位置
     */
    function vditorRender(elId="vditor-article-sign") {
        Vditor.setContentTheme(darkMode?"dark":"light", THEME_PREFIX)
        let root = document.getElementById(elId)
        if (!root) {
            console.log("[Vditor Render] Can't Found Article Root Element!");
            return
        }
        root = root.parentElement
        root.classList.add("vditor-reset")
        console.log(`Using CDN: ${this.CDN}`)
        // Render
        const renderTheme = darkMode?"dark":"classic"
        Vditor.mathRender(root, {cdn: this.CDN})
        Vditor.mindmapRender(root, this.CDN, renderTheme)
        Vditor.mermaidRender(root, this.CDN, renderTheme)
        Vditor.chartRender(root, this.CDN, renderTheme)
        Vditor.abcRender(root, this.CDN)
        Vditor.graphvizRender(root, this.CDN)
        Vditor.flowchartRender(root, this.CDN)
        Vditor.plantumlRender(root, this.CDN)
        // Run External Plugin
        functionList.forEach(func => {
            func({
                darkMode
            })
        })
    }

    win.vditorRender = {
        THEME_PREFIX,
        CDN,
        functionList,
        darkMode,
        addExternal,
        setDarkMode,
        vditorRender,
        render: vditorRender,
        setCDN
    }
})(window)