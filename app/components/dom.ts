'use client';
import ArrayUtil from './array';
import StringHelper from './string';

//methods
class Dom7 {
    [key: number]: HTMLElement;
    length: number;

    constructor(arr: any[]) {
        const me = this;
        for (let i = 0; i < arr.length; i++) {
            me[i] = arr[i];
        }
        this.length = arr.length;
    }

    get(index: number): HTMLElement {
        return this[index];
    }

    addClass(className: string): this {
        if (typeof className === 'undefined') {
            return this;
        }

        const classes = className.split(' ');
        for (let i = 0; i < classes.length; i++) {
            for (let j = 0; j < this.length; j++) {
                if (typeof this[j].classList !== 'undefined') {
                    this[j].classList.add(classes[i]);
                }
            }
        }

        return this;
    }

    removeClass(className: string): this {
        const classes = className.split(' ');
        for (let i = 0; i < classes.length; i++) {
            for (let j = 0; j < this.length; j++) {
                if (typeof this[j].classList !== 'undefined') {
                    this[j].classList.remove(classes[i]);
                }
            }
        }
        return this;
    }

    hasClass(className: string): boolean {
        if (!this[0] || !this[0].classList) {
            return false;
        } else {
            return this[0].classList.contains(className);
        }
    }

    toggleClass(className: string): this {
        const classes = className.split(' ');
        for (let i = 0; i < classes.length; i++) {
            for (let j = 0; j < this.length; j++) {
                if (typeof this[j].classList !== 'undefined') {
                    this[j].classList.toggle(classes[i]);
                }
            }
        }
        return this;
    }

    attr(attrs: string | { [key: string]: any }, value?: any): this | string | undefined {
        if (arguments.length === 1 && typeof attrs === 'string') {
            // Get attr
            if (this[0]) {
                return this[0].getAttribute(attrs);
            } else {
                return undefined;
            }
        } else {
            // Set attrs
            for (let i = 0; i < this.length; i++) {
                if (arguments.length === 2) {
                    // String
                    this[i].setAttribute(attrs as string, value as string);
                } else {
                    // Object
                    for (const attrName in attrs) {
                        this[i][attrName] = (attrs as { [key: string]: any })[attrName];
                        this[i].setAttribute(attrName, (attrs as { [key: string]: any })[attrName]);
                    }
                }
            }
            return this;
        }
    }

    removeAttr(attr: string): this {
        for (let i = 0; i < this.length; i++) {
            this[i].removeAttribute(attr);
        }
        return this;
    }

    hasAttr(attrs: string): boolean {
        return this[0] && this[0].hasAttribute(attrs);
    }
    prop(props: string | { [key: string]: any }, value?: any): this | any {
        if (arguments.length === 1 && typeof props === 'string') {
            // Get prop
            if (this[0]) {
                return this[0][props];
            } else {
                return undefined;
            }
        } else {
            // Set props
            for (let i = 0; i < this.length; i++) {
                if (arguments.length === 2) {
                    // String
                    this[i][props as string] = value;
                } else {
                    // Object
                    for (const propName in props) {
                        this[i][propName] = (props as { [key: string]: any })[propName];
                    }
                }
            }
            return this;
        }
    }

    data(key: string, value?: any): this | any {
        if (typeof value === 'undefined') {
            // Get value
            if (this[0]) {
                if (this[0].dom7ElementDataStorage && (key in this[0].dom7ElementDataStorage)) {
                    return this[0].dom7ElementDataStorage[key];
                } else {
                    const dataKey = this[0].getAttribute(`data-${key}`);
                    if (dataKey) {
                        return dataKey;
                    } else {
                        return undefined;
                    }
                }
            } else {
                return undefined;
            }
        } else {
            // Set value
            for (let i = 0; i < this.length; i++) {
                const el = this[i];
                if (!el.dom7ElementDataStorage) {
                    el.dom7ElementDataStorage = {};
                }
                el.dom7ElementDataStorage[key] = value;
            }
            return this;
        }
    }

    removeData(key: string): this {
        for (let i = 0; i < this.length; i++) {
            const el = this[i];
            if (el.dom7ElementDataStorage && el.dom7ElementDataStorage[key]) {
                el.dom7ElementDataStorage[key] = null;
                delete el.dom7ElementDataStorage[key];
            }
        }
        return this;
    }

    dataset(): { [key: string]: any } | undefined {
        const el = this[0];
        if (el) {
            const dataset: { [key: string]: any } = {};
            if (el.dataset) {
                for (const dataKey in el.dataset) {
                    dataset[dataKey] = el.dataset[dataKey];
                }
            } else {
                for (let i = 0; i < el.attributes.length; i++) {
                    const attr = el.attributes[i];
                    if (attr.name.indexOf('data-') >= 0) {
                        dataset[this.toCamelCase(attr.name.split('data-')[1])] = attr.value;
                    }
                }
            }

            for (const key in dataset) {
                if (dataset[key] === 'false') {
                    dataset[key] = false;
                } else if (dataset[key] === 'true') {
                    dataset[key] = true;
                } else if (parseFloat(dataset[key]) === dataset[key] * 1) {
                    dataset[key] = dataset[key] * 1;
                }
            }

            return dataset;
        } else {
            return undefined;
        }
    }

    private toCamelCase(str: string): string {
        return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
    }
    val(value?: string): this | string | undefined {
        if (typeof value === 'undefined') {
            if (this[0]) {
                return this[0].value;
            } else {
                return undefined;
            }
        } else {
            for (let i = 0; i < this.length; i++) {
                this[i].value = value;
            }
            return this;
        }
    }

    transform(transform: string): this {
        for (let i = 0; i < this.length; i++) {
            const elStyle = this[i].style;
            elStyle.webkitTransform = elStyle.MsTransform = elStyle.msTransform = elStyle.MozTransform = elStyle.OTransform = elStyle.transform = transform;
        }
        return this;
    }

    transition(duration: number | string): this {
        const durationStr = typeof duration === 'string' ? duration : `${duration}ms`;
        for (let i = 0; i < this.length; i++) {
            const elStyle = this[i].style;
            elStyle.webkitTransitionDuration = elStyle.MsTransitionDuration = elStyle.msTransitionDuration = elStyle.MozTransitionDuration = elStyle.OTransitionDuration = elStyle.transitionDuration = durationStr;
        }
        return this;
    }

    on(eventName: string, targetSelector: string | Function | false, listener: EventListener, capture?: boolean): this {
        const events = eventName.split(' ');
        for (let i = 0; i < this.length; i++) {
            if (typeof targetSelector === 'function' || targetSelector === false) {
                // Usual events
                if (typeof targetSelector === 'function') {
                    listener = arguments[1] as EventListener;
                    capture = arguments[2] as boolean | undefined;
                }
                for (let j = 0; j < events.length; j++) {
                    this[i].addEventListener(events[j], listener, capture);
                }
            } else {
                // Live events
                for (let j = 0; j < events.length; j++) {
                    if (!this[i].dom7LiveListeners) {
                        this[i].dom7LiveListeners = [];
                    }
                    this[i].dom7LiveListeners.push({ listener, liveListener: this.handleLiveEvent.bind(this, targetSelector, listener) });
                    this[i].addEventListener(events[j], this[i].dom7LiveListeners[this[i].dom7LiveListeners.length - 1].liveListener, capture);
                }
            }
        }
        return this;
    }

    off(eventName: string, targetSelector: string | Function | false, listener: EventListener, capture?: boolean): this {
        const events = eventName.split(' ');
        for (let i = 0; i < events.length; i++) {
            for (let j = 0; j < this.length; j++) {
                if (typeof targetSelector === 'function' || targetSelector === false) {
                    // Usual events
                    if (typeof targetSelector === 'function') {
                        listener = arguments[1] as EventListener;
                        capture = arguments[2] as boolean | undefined;
                    }
                    this[j].removeEventListener(events[i], listener, capture);
                } else {
                    // Live event
                    if (this[j].dom7LiveListeners) {
                        for (let k = 0; k < this[j].dom7LiveListeners.length; k++) {
                            if (this[j].dom7LiveListeners[k].listener === listener) {
                                this[j].removeEventListener(events[i], this[j].dom7LiveListeners[k].liveListener, capture);
                            }
                        }
                    }
                }
            }
        }
        return this;
    }

    private handleLiveEvent(targetSelector: string, listener: EventListener, e: Event): void {
        const target = e.target as HTMLElement;
        if (this.matches(target, targetSelector)) {
            listener.call(target, e);
        } else {
            const parents = this.parents(target);
            for (let k = 0; k < parents.length; k++) {
                if (this.matches(parents[k], targetSelector)) {
                    listener.call(parents[k], e);
                }
            }
        }
    }

    once(eventName: string, targetSelector: string | Function | false, listener: EventListener, capture?: boolean): this {
        if (typeof targetSelector === 'function') {
            listener = arguments[1] as EventListener;
            capture = arguments[2] as boolean | undefined;
            targetSelector = false;
        }
        const dom = this;
        function proxy(e: Event): void {
            listener.call(e.target, e);
            dom.off(eventName, targetSelector, proxy, capture);
        }
        return dom.on(eventName, targetSelector, proxy, capture);
    }

    trigger(eventName: string, eventData?: any): this {
        const events = eventName.split(' ');
        for (let i = 0; i < events.length; i++) {
            for (let j = 0; j < this.length; j++) {
                let evt: Event;
                try {
                    evt = new CustomEvent(events[i], { detail: eventData, bubbles: true, cancelable: true });
                } catch (e) {
                    evt = document.createEvent('Event');
                    evt.initEvent(events[i], true, true);
                    (evt as any).detail = eventData;
                }
                this[j].dispatchEvent(evt);
            }
        }
        return this;
    }


    transitionEnd(callback: (e: Event) => void): this {
        const events = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'];
        const dom = this;
        function fireCallBack(e: Event): void {
            if (e.target !== this) {
                return;
            }
            callback.call(this, e);
            for (let i = 0; i < events.length; i++) {
                dom.off(events[i], fireCallBack);
            }
        }
        if (callback) {
            for (let i = 0; i < events.length; i++) {
                dom.on(events[i], fireCallBack);
            }
        }
        return this;
    }

    animationEnd(callback: (e: Event) => void): this {
        const events = ['webkitAnimationEnd', 'OAnimationEnd', 'MSAnimationEnd', 'animationend'];
        const dom = this;
        function fireCallBack(e: Event): void {
            callback(e);
            for (let i = 0; i < events.length; i++) {
                dom.off(events[i], fireCallBack);
            }
        }
        if (callback) {
            for (let i = 0; i < events.length; i++) {
                dom.on(events[i], fireCallBack);
            }
        }
        return this;
    }

    width(): number | null {
        if (this[0] === window) {
            return window.innerWidth;
        } else if (this.length > 0) {
            return parseFloat(this.css('width'));
        } else {
            return null;
        }
    }

    outerWidth(includeMargins?: boolean): number | null {
        if (this.length > 0) {
            if (includeMargins) {
                const styles = this.styles();
                return this[0].offsetWidth + parseFloat(styles.getPropertyValue('margin-right')) + parseFloat(styles.getPropertyValue('margin-left'));
            } else {
                return this[0].offsetWidth;
            }
        } else {
            return null;
        }
    }

    height(): number | null {
        if (this[0] === window) {
            return window.innerHeight;
        } else if (this.length > 0) {
            return parseFloat(this.css('height'));
        } else {
            return null;
        }
    }

    outerHeight(includeMargins?: boolean): number | null {
        if (this.length > 0) {
            if (includeMargins) {
                const styles = this.styles();
                return this[0].offsetHeight + parseFloat(styles.getPropertyValue('margin-top')) + parseFloat(styles.getPropertyValue('margin-bottom'));
            } else {
                return this[0].offsetHeight;
            }
        } else {
            return null;
        }
    }

    offset(): { top: number; left: number } | null {
        if (this.length > 0) {
            const el = this[0];
            const box = el.getBoundingClientRect();
            const body = document.body;
            const clientTop = el.clientTop || body.clientTop || 0;
            const clientLeft = el.clientLeft || body.clientLeft || 0;
            const scrollTop = window.pageYOffset || el.scrollTop;
            const scrollLeft = window.pageXOffset || el.scrollLeft;
            return {
                top: box.top + scrollTop - clientTop,
                left: box.left + scrollLeft - clientLeft,
            };
        } else {
            return null;
        }
    }

    hide(): this {
        for (let i = 0; i < this.length; i++) {
            this[i].style.display = 'none';
        }
        return this;
    }

    show(): this {
        for (let i = 0; i < this.length; i++) {
            this[i].style.display = 'block';
        }
        return this;
    }

    styles(): CSSStyleDeclaration | undefined {
        if (this[0]) {
            return window.getComputedStyle(this[0], null);
        } else {
            return undefined;
        }
    }

    css(props: string | { [key: string]: any }, value?: any): this | string {
        if (arguments.length === 1) {
            if (typeof props === 'string') {
                if (this[0]) {
                    return window.getComputedStyle(this[0], null).getPropertyValue(props);
                }
            } else {
                for (let i = 0; i < this.length; i++) {
                    for (const prop in props) {
                        this[i].style[prop] = props[prop];
                    }
                }
                return this;
            }
        }
        if (arguments.length === 2 && typeof props === 'string') {
            for (let i = 0; i < this.length; i++) {
                this[i].style[props] = value;
            }
            return this;
        }
        return this;
    }

    each(callback: (index: number, element: HTMLElement) => void): this {
        for (let i = 0; i < this.length; i++) {
            callback.call(this[i], i, this[i]);
        }
        return this;
    }

    filter(callback: (index: number, element: HTMLElement) => boolean): Dom7 {
        const matchedItems: HTMLElement[] = [];
        for (let i = 0; i < this.length; i++) {
            if (callback.call(this[i], i, this[i])) {
                matchedItems.push(this[i]);
            }
        }
        return new Dom7(matchedItems);
    }

    html(html?: string): string | Dom7 {
        if (typeof html === 'undefined') {
            return this[0] ? this[0].innerHTML : undefined;
        } else {
            for (let i = 0; i < this.length; i++) {
                this[i].innerHTML = html;
            }
            return this;
        }
    }

    text(text?: string): string | Dom7 {
        if (typeof text === 'undefined') {
            if (this[0]) {
                return this[0].textContent.trim();
            } else {
                return null;
            }
        } else {
            for (let i = 0; i < this.length; i++) {
                this[i].textContent = text;
            }
            return this;
        }
    }

    is(selector: string): boolean {
        if (!this[0] || typeof selector === 'undefined') {
            return false;
        }
        let compareWith: Dom7;
        let i: number;
        if (typeof selector === 'string') {
            const el = this[0];
            if (el === document) {
                return selector === document;
            }
            if (el === window) {
                return selector === window;
            }
            if (el.matches) {
                return el.matches(selector);
            } else if (el.webkitMatchesSelector) {
                return el.webkitMatchesSelector(selector);
            } else if (el.mozMatchesSelector) {
                return el.mozMatchesSelector(selector);
            } else if (el.msMatchesSelector) {
                return el.msMatchesSelector(selector);
            } else {
                compareWith = $(selector);
                for (i = 0; i < compareWith.length; i++) {
                    if (compareWith[i] === this[0]) {
                        return true;
                    }
                }
                return false;
            }
        } else if (selector === document) {
            return this[0] === document;
        } else if (selector === window) {
            return this[0] === window;
        } else {
            if (selector.nodeType || selector instanceof Dom7) {
                compareWith = selector.nodeType ? [selector] : selector;
                for (i = 0; i < compareWith.length; i++) {
                    if (compareWith[i] === this[0]) {
                        return true;
                    }
                }
                return false;
            }
            return false;
        }
    }

    indexOf(el: any): number {
        for (let i = 0; i < this.length; i++) {
            if (this[i] === el) {
                return i;
            }
        }
        return -1;
    }

    index(): number | undefined {
        if (this[0]) {
            const child = this[0];
            let i = 0;
            while ((child = child.previousSibling) !== null) {
                if (child.nodeType === 1) {
                    i++;
                }
            }
            return i;
        } else {
            return undefined;
        }
    }

    eq(index: number): Dom7 {
        if (typeof index === 'undefined') {
            return this;
        }
        const length = this.length;
        let returnIndex: number;
        if (index > length - 1) {
            return new Dom7([]);
        }
        if (index < 0) {
            returnIndex = length + index;
            if (returnIndex < 0) {
                return new Dom7([]);
            } else {
                return new Dom7([this[returnIndex]]);
            }
        }
        return new Dom7([this[index]]);
    }

    append(newChild: string | Dom7 | HTMLElement): Dom7 {
        for (let i = 0; i < this.length; i++) {
            if (typeof newChild === 'string') {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = newChild;
                while (tempDiv.firstChild) {
                    this[i].appendChild(tempDiv.firstChild);
                }
            } else if (newChild instanceof Dom7) {
                for (let j = 0; j < newChild.length; j++) {
                    this[i].appendChild(newChild[j]);
                }
            } else {
                this[i].appendChild(newChild);
            }
        }
        return this;
    }

    appendTo(parent: string | Dom7 | HTMLElement): Dom7 {
        $(parent).append(this);
        return this;
    }

    prepend(newChild: string | Dom7 | HTMLElement): Dom7 {
        for (let i = 0; i < this.length; i++) {
            if (typeof newChild === 'string') {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = newChild;
                for (let j = tempDiv.childNodes.length - 1; j >= 0; j--) {
                    this[i].insertBefore(tempDiv.childNodes[j], this[i].childNodes[0]);
                }
            } else if (newChild instanceof Dom7) {
                for (let j = 0; j < newChild.length; j++) {
                    this[i].insertBefore(newChild[j], this[i].childNodes[0]);
                }
            } else {
                this[i].insertBefore(newChild, this[i].childNodes[0]);
            }
        }
        return this;
    }

    prependTo(parent: string | Dom7 | HTMLElement): Dom7 {
        $(parent).prepend(this);
        return this;
    }

    insertBefore(selector: string | Dom7 | HTMLElement): Dom7 {
        const before = $(selector);
        for (let i = 0; i < this.length; i++) {
            if (before.length === 1) {
                before[0].parentNode.insertBefore(this[i], before[0]);
            } else if (before.length > 1) {
                for (let j = 0; j < before.length; j++) {
                    before[j].parentNode.insertBefore(this[i].cloneNode(true), before[j]);
                }
            }
        }
        return this;
    }

    insertAfter(selector: string | Dom7 | HTMLElement): Dom7 {
        const after = $(selector);
        for (let i = 0; i < this.length; i++) {
            if (after.length === 1) {
                after[0].parentNode.insertBefore(this[i], after[0].nextSibling);
            } else if (after.length > 1) {
                for (let j = 0; j < after.length; j++) {
                    after[j].parentNode.insertBefore(this[i].cloneNode(true), after[j].nextSibling);
                }
            }
        }
        return this;
    }

    next(selector?: string): Dom7 {
        if (this.length > 0) {
            if (selector) {
                if (this[0].nextElementSibling && $(this[0].nextElementSibling).is(selector)) {
                    return new Dom7([this[0].nextElementSibling]);
                } else {
                    return new Dom7([]);
                }
            } else {
                if (this[0].nextElementSibling) {
                    return new Dom7([this[0].nextElementSibling]);
                } else {
                    return new Dom7([]);
                }
            }
        } else {
            return new Dom7([]);
        }
    }

    nextAll(selector?: string): Dom7 {
        const nextEls = [];
        const el = this[0];
        if (!el) {
            return new Dom7([]);
        }
        while (el.nextElementSibling) {
            const next = el.nextElementSibling;
            if (selector) {
                if ($(next).is(selector)) {
                    nextEls.push(next);
                }
            } else {
                nextEls.push(next);
            }
            el = next;
        }
        return new Dom7(nextEls);
    }

    prev(selector?: string): Dom7 {
        if (this.length > 0) {
            if (selector) {
                if (this[0].previousElementSibling && $(this[0].previousElementSibling).is(selector)) {
                    return new Dom7([this[0].previousElementSibling]);
                } else {
                    return new Dom7([]);
                }
            } else {
                if (this[0].previousElementSibling) {
                    return new Dom7([this[0].previousElementSibling]);
                } else {
                    return new Dom7([]);
                }
            }
        } else {
            return new Dom7([]);
        }
    }

    prevAll(selector?: string): Dom7 {
        const prevEls = [];
        const el = this[0];
        if (!el) {
            return new Dom7([]);
        }
        while (el.previousElementSibling) {
            const prev = el.previousElementSibling;
            if (selector) {
                if ($(prev).is(selector)) {
                    prevEls.push(prev);
                }
            } else {
                prevEls.push(prev);
            }
            el = prev;
        }
        return new Dom7(prevEls);
    }

    parent(selector?: string): Dom7 {
        const parents = [];
        for (let i = 0; i < this.length; i++) {
            if (this[i].parentNode !== null) {
                if (selector) {
                    if ($(this[i].parentNode).is(selector)) {
                        parents.push(this[i].parentNode);
                    }
                } else {
                    parents.push(this[i].parentNode);
                }
            }
        }
        return $(ArrayUtil.unique(parents));
    }

    parents(selector?: string): Dom7 {
        const parents = [];
        for (let i = 0; i < this.length; i++) {
            let parent = this[i].parentNode;
            while (parent) {
                if (selector) {
                    if ($(parent).is(selector)) {
                        parents.push(parent);
                    }
                } else {
                    parents.push(parent);
                }
                parent = parent.parentNode;
            }
        }
        return $(ArrayUtil.unique(parents));
    }

    closest(selector: string): Dom7 {
        let closest = this;
        if (typeof selector === 'undefined') {
            return new Dom7([]);
        }
        if (!closest.is(selector)) {
            closest = closest.parents(selector).eq(0);
        }
        return closest;
    }

    find(selector: string): Dom7 {
        const foundElements = [];
        for (let i = 0; i < this.length; i++) {
            if (this[i].nodeType === Node.TEXT_NODE) {
                continue;
            }
            const found = this[i].querySelectorAll(selector);
            for (let j = 0; j < found.length; j++) {
                foundElements.push(found[j]);
            }
        }
        return new Dom7(foundElements);
    }

    children(selector?: string): Dom7 {
        const children = [];
        for (let i = 0; i < this.length; i++) {
            const childNodes = this[i].childNodes;
            for (let j = 0; j < childNodes.length; j++) {
                if (!selector) {
                    if (childNodes[j].nodeType === 1) {
                        children.push(childNodes[j]);
                    }
                } else {
                    if (childNodes[j].nodeType === 1 && $(childNodes[j]).is(selector)) {
                        children.push(childNodes[j]);
                    }
                }
            }
        }
        return new Dom7(ArrayUtil.unique(children));
    }

    remove(): Dom7 {
        for (let i = 0; i < this.length; i++) {
            if (this[i].parentNode) {
                this[i].parentNode.removeChild(this[i]);
            }
        }
        return this;
    }

    detach(): Dom7 {
        return this.remove();
    }

    add(...args: (string | Dom7 | HTMLElement)[]): Dom7 {
        const dom = this;
        for (let i = 0; i < args.length; i++) {
            const toAdd = $(args[i]);
            for (let j = 0; j < toAdd.length; j++) {
                dom[dom.length] = toAdd[j];
                dom.length++;
            }
        }
        return dom;
    }


    scrollTo(left: number, top: number, duration: number, easing?: string, callback?: () => void): this {
        if (arguments.length === 4 && typeof easing === 'function') {
            callback = easing;
            easing = undefined;
        }
        return this.each(function () {
            const el = this as HTMLElement;
            let currentTop, currentLeft, maxTop, maxLeft, newTop, newLeft, scrollTop, scrollLeft;
            let animateTop = top > 0 || top === 0;
            let animateLeft = left > 0 || left === 0;
            if (typeof easing === 'undefined') {
                easing = 'swing';
            }
            if (animateTop) {
                currentTop = el.scrollTop;
                if (!duration) {
                    el.scrollTop = top;
                }
            }
            if (animateLeft) {
                currentLeft = el.scrollLeft;
                if (!duration) {
                    el.scrollLeft = left;
                }
            }
            if (!duration) return;
            if (animateTop) {
                maxTop = el.scrollHeight - el.offsetHeight;
                newTop = Math.max(Math.min(top, maxTop), 0);
            }
            if (animateLeft) {
                maxLeft = el.scrollWidth - el.offsetWidth;
                newLeft = Math.max(Math.min(left, maxLeft), 0);
            }
            let startTime = null;
            if (animateTop && newTop === currentTop) animateTop = false;
            if (animateLeft && newLeft === currentLeft) animateLeft = false;
            function render(time: number) {
                if (time === undefined) {
                    time = new Date().getTime();
                }
                if (startTime === null) {
                    startTime = time;
                }
                let doneLeft, doneTop, done;
                const progress = Math.max(Math.min((time - startTime) / duration, 1), 0);
                const easeProgress = easing === 'linear' ? progress : (0.5 - Math.cos(progress * Math.PI) / 2);
                if (animateTop) scrollTop = currentTop + (easeProgress * (newTop - currentTop));
                if (animateLeft) scrollLeft = currentLeft + (easeProgress * (newLeft - currentLeft));
                if (animateTop && newTop > currentTop && scrollTop >= newTop) {
                    el.scrollTop = newTop;
                    done = true;
                }
                if (animateTop && newTop < currentTop && scrollTop <= newTop) {
                    el.scrollTop = newTop;
                    done = true;
                }

                if (animateLeft && newLeft > currentLeft && scrollLeft >= newLeft) {
                    el.scrollLeft = newLeft;
                    done = true;
                }
                if (animateLeft && newLeft < currentLeft && scrollLeft <= newLeft) {
                    el.scrollLeft = newLeft;
                    done = true;
                }

                if (done) {
                    if (callback) callback();
                    return;
                }
                if (animateTop) el.scrollTop = scrollTop;
                if (animateLeft) el.scrollLeft = scrollLeft;
                $.requestAnimationFrame(render);
            }
            $.requestAnimationFrame(render);
        });
    }

    scrollTop(top?: number, duration?: number, easing?: string, callback?: () => void): number | this {
        if (arguments.length === 3 && typeof easing === 'function') {
            callback = easing;
            easing = undefined;
        }
        const dom = this;
        if (typeof top === 'undefined') {
            if (dom.length > 0) return dom[0].scrollTop;
            else return null;
        }
        return dom.scrollTo(undefined, top, duration, easing, callback);
    }

    scrollLeft(left?: number, duration?: number, easing?: string, callback?: () => void): number | this {
        if (arguments.length === 3 && typeof easing === 'function') {
            callback = easing;
            easing = undefined;
        }
        const dom = this;
        if (typeof left === 'undefined') {
            if (dom.length > 0) return dom[0].scrollLeft;
            else return null;
        }
        return dom.scrollTo(left, undefined, duration, easing, callback);
    }

}

// $.dataset = function (el) {
//     return $(el).dataset();
// };

const $ = function (selector: string | HTMLElement | Node | HTMLElement[] , context?: HTMLElement | Dom7): Dom7 {
    const arr: HTMLElement[] = [];
    let i = 0;

    if (selector && !context) {
        if (selector instanceof Dom7) {
            return selector;
        }
    }

    if (context && context instanceof Dom7) {
        context = context[0];
    }

    if (selector) {
        // String
        if (typeof selector === 'string') {
            let els: NodeList | HTMLElement[] = [];
            let tempParent: HTMLElement | undefined;
            const html = selector.trim();

            if (html.indexOf('<') >= 0 && html.indexOf('>') >= 0) {
                let toCreate = 'div';
                if (html.indexOf('<li') === 0) toCreate = 'ul';
                if (html.indexOf('<tr') === 0) toCreate = 'tbody';
                if (html.indexOf('<td') === 0 || html.indexOf('<th') === 0) toCreate = 'tr';
                if (html.indexOf('<tbody') === 0) toCreate = 'table';
                if (html.indexOf('<option') === 0) toCreate = 'select';

                tempParent = document.createElement(toCreate);
                tempParent.innerHTML = html;

                for (i = 0; i < tempParent.childNodes.length; i++) {
                    arr.push(tempParent.childNodes[i] as HTMLElement);
                }
            } else {
                if (!context && selector[0] === '#' && !selector.match(/[ .<>:~]/)) {
                    // Pure ID selector
                    const el = document.getElementById(selector.split('#')[1]);
                    if (el) els = [el];
                } else {
                    // Other selectors
                    els = (context || document).querySelectorAll(selector);
                }

                for (i = 0; i < els.length; i++) {
                    if (els[i]) arr.push(els[i] as HTMLElement);
                }
            }
        }
        // Node/element
        else if (selector.nodeType || toString.call(selector) === toString.call(window) || toString.call(selector) === toString.call(document)) {
            arr.push(selector as HTMLElement);
        }
        //Array of elements or instance of Dom
        else if (selector.length > 0 && selector[0].nodeType) {
            for (i = 0; i < selector.length; i++) {
                arr.push(selector[i] as HTMLElement);
            }
        }
    }

    return new Dom7(arr);
};


$.getTranslate = function (el, axis) {
    var matrix, curTransform, curStyle, transformMatrix;

    // automatic axis detection
    if (typeof axis === 'undefined') {
        axis = 'x';
    }

    curStyle = window.getComputedStyle(el, null);
    if (window.WebKitCSSMatrix) {
        curTransform = curStyle.transform || curStyle.webkitTransform;
        if (curTransform.split(',').length > 6) {
            curTransform = curTransform.split(', ').map(function (a) {
                return a.replace(',', '.');
            }).join(', ');
        }
        // Some old versions of Webkit choke when 'none' is passed; pass
        // empty string instead in this case
        transformMatrix = new WebKitCSSMatrix(curTransform === 'none' ? '' : curTransform);
    }
    else {
        transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
        matrix = transformMatrix.toString().split(',');
    }

    if (axis === 'x') {
        //Latest Chrome and webkits Fix
        if (window.WebKitCSSMatrix)
            curTransform = transformMatrix.m41;
        //Crazy IE10 Matrix
        else if (matrix.length === 16)
            curTransform = parseFloat(matrix[12]);
        //Normal Browsers
        else
            curTransform = parseFloat(matrix[4]);
    }
    if (axis === 'y') {
        //Latest Chrome and webkits Fix
        if (window.WebKitCSSMatrix)
            curTransform = transformMatrix.m42;
        //Crazy IE10 Matrix
        else if (matrix.length === 16)
            curTransform = parseFloat(matrix[13]);
        //Normal Browsers
        else
            curTransform = parseFloat(matrix[5]);
    }

    return curTransform || 0;
};

$.requestAnimationFrame = function (callback) {
    if (window.requestAnimationFrame) return window.requestAnimationFrame(callback);
    else if (window.webkitRequestAnimationFrame) return window.webkitRequestAnimationFrame(callback);
    else if (window.mozRequestAnimationFrame) return window.mozRequestAnimationFrame(callback);
    else {
        return window.setTimeout(callback, 1000 / 60);
    }
};
$.cancelAnimationFrame = function (id) {
    if (window.cancelAnimationFrame) return window.cancelAnimationFrame(id);
    else if (window.webkitCancelAnimationFrame) return window.webkitCancelAnimationFrame(id);
    else if (window.mozCancelAnimationFrame) return window.mozCancelAnimationFrame(id);
    else {
        return window.clearTimeout(id);
    }
};

// $.supportTouch = !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);



// Shortcuts
(function () {
    var shortcuts = ('click blur focus focusin focusout keyup keydown keypress submit change mousedown mousemove mouseup mouseenter mouseleave mouseout mouseover touchstart touchend touchmove resize scroll contextmenu').split(' ');
    var notTrigger = ('resize scroll').split(' ');
    function createMethod(name) {
        Dom7.prototype[name] = function (targetSelector, listener, capture) {
            var i;
            if (typeof targetSelector === 'undefined') {
                for (i = 0; i < this.length; i++) {
                    if (notTrigger.indexOf(name) < 0) {
                        if (name in this[i]) this[i][name]();
                        else {
                            $(this[i]).trigger(name);
                        }
                    }
                }
                return this;
            }
            else {
                return this.on(name, targetSelector, listener, capture);
            }
        };
    }
    for (var i = 0; i < shortcuts.length; i++) {
        createMethod(shortcuts[i]);
    }
})();

export default $

