const SUBSTITUTE_REG = /\\?\$\{([^{}]+)\}/g;
const EMPTY = '';

interface StringHelper {
    substitute(str: string, o: Record<string, any>, regexp?: RegExp): string;
    trim(str: string): string;
    toCamelCase(string: string): string;
    sizeof(str: string, charset?: string): number;
}

const StringHelper: StringHelper = {
    substitute(str, o, regexp) {
        if (typeof str !== 'string' || !o) {
            return str;
        }

        return str.replace(regexp || SUBSTITUTE_REG, function (match, name) {
            if (match.charAt(0) === '\\') {
                return match.slice(1);
            }
            return (o[name] === undefined) ? EMPTY : o[name];
        });
    },

    trim(str) {
        return str.replace(/(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g, '');
    },

    toCamelCase(string) {
        return string.toLowerCase().replace(/-(.)/g, function (match, group1) {
            return group1.toUpperCase();
        });
    },

    sizeof(str, charset) {
        let total = 0;
        let charCode;
        let i;
        const len = str.length;
        charset = charset ? charset.toLowerCase() : '';
        if (charset === 'utf-16' || charset === 'utf16') {
            for (i = 0; i < len; i++) {
                charCode = str.charCodeAt(i);
                if (charCode <= 0xffff) {
                    total += 2;
                } else {
                    total += 4;
                }
            }
        } else {
            for (i = 0; i < len; i++) {
                charCode = str.charCodeAt(i);
                if (charCode <= 0x007f) {
                    total += 1;
                } else if (charCode <= 0x07ff) {
                    total += 2;
                } else if (charCode <= 0xffff) {
                    total += 3;
                } else {
                    total += 4;
                }
            }
        }
        return total;
    },
};

export default StringHelper;
