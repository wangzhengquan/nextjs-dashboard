const ArrayHelper = {
    isArray: function (val: any): boolean {
        if (!val) {
            return false;
        }
        return Object.prototype.toString.call(val) === '[object Array]';
    },

    toArray: function (obj: any, offset?: number): any[] {
        return Array.prototype.slice.call(obj, offset || 0);
    },

    each: function (obj: any, fn: (value: any, index: number | string) => boolean): void {
        if (ArrayHelper.isArray(obj)) {
            for (let i = 0, len = obj.length; i < len; i++) {
                if (fn.call(obj[i], obj[i], i) === false) {
                    break;
                }
            }
        } else {
            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    if (fn.call(obj[key], obj[key], key) === false) {
                        break;
                    }
                }
            }
        }
    },

    inArray: function (arr: any[], val: any): number {
        for (let i = 0, len = arr.length; i < len; i++) {
            if (val === arr[i]) {
                return i;
            }
        }
        return -1;
    },

    unique: function (arr: any[]): any[] {
        const unique: any[] = [];
        for (let i = 0; i < arr.length; i++) {
            if (unique.indexOf(arr[i]) === -1) {
                unique.push(arr[i]);
            }
        }
        return unique;
    },
};

export default ArrayHelper;