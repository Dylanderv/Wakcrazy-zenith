export class Url {
    private Url: string;
    private QueryParams: { key: string, value: string }[];

    constructor(url: string) {
        this.Url = url;
        this.QueryParams = [];
    }

    public SetQueryParams(queryParams: { key: string, value: string }[]): Url {
        this.QueryParams = queryParams;
        return this;
    }

    public SetQueryParam(key: string, value: string | undefined): Url {
        if (value !== undefined) {
            this.QueryParams.push({key, value});
        }
        return this;
    }

    public AppendPathSegment(segment: string): Url {
        if (segment === null || segment === undefined) return this;

        if (!this.HasCurrentUrlWithTrailingSlash() && this.IsBeginningWithSlash(segment)
            || this.HasCurrentUrlWithTrailingSlash() && !this.IsBeginningWithSlash(segment)) {
            this.Url += segment;
        } else if (this.HasCurrentUrlWithTrailingSlash()) {
            this.Url += segment.substring(1);
        } else {
            this.Url += `/${segment}`;
        }
        return this;
    }

    public AppendPathSegments(segments: string[]): Url {
        segments.forEach(this.AppendPathSegment);
        return this;
    }

    private HasCurrentUrlWithTrailingSlash(): boolean {
        return this.Url.charAt(this.Url.length - 1) === '/';
    }

    private IsBeginningWithSlash(segment: string): boolean {
        return segment.charAt(0) === '/';
    }

    public ToString(): string {
        if (this.QueryParams.length === 0) {
            return this.Url;
        }
        return `${this.Url}?${this.QueryParams.map(x => `${x.key}=${x.value}`).join("&")}`
    }

}