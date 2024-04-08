import Script from 'next/script'
export default function StringUtil({}) {
    return (
    <Script id="string-helper-script">
    {`
    const SUBSTITUTE_REG = /\\?\$\{([^{}]+)\}/g,
    EMPTY = '';
    
    var StringUtil = {
    };
    
    StringUtil.trim = function(str) {
        return str.replace(/(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g, '');
    };
    /**
     * 下划线样式转成驼峰样式
     * @param  {[type]} string [description]
     * @return {[type]}        [description]
     */
    StringUtil.toCamelCase = function (string) {
        return string.toLowerCase().replace(/-(.)/g, function(match, group1) {
            return group1.toUpperCase();
        });
    };
     
        
    `}
    </Script>  
    );
}

