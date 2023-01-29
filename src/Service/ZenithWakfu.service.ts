import {Url} from "../SimiliFlurl/Url";
import {BuildList} from "../Dto/BuildList";
import {Build} from "../Dto/Build";
import {Enchants} from "../Dto/Enchants";
import {BuildDetail} from "../Dto/BuildDetail";

class ZenithWakfuService {
    private BaseUrl: string = 'https://www.zenithwakfu.com/builder';
    private ApiBaseUrl: string = 'https://api.zenithwakfu.com/builder/api';
    private ImageBaseUrl: string = 'https://www.zenithwakfu.com/images/items/';
    private ClassIconsBaseUrl: string = 'https://www.zenithwakfu.com/images/breeds/icons/';
    private SpellIconsBaseUrl: string = 'https://www.zenithwakfu.com/images/spells/';
    private BuildPictosBaseUrl: string = 'https://www.zenithwakfu.com/images/build_pictos/';
    public DefaultMinLevel: number = 0;
    public DefaultMaxLevel: number = 230;

    public async GetBuilds(
        pageNumber: number,
        filters:
            {
                ClassFilter?: Class[],
                LevelFilter?: {Min?: number, Max?: number}
            } = {}

    ): Promise<BuildList> {

        const sanitizedLevelFilter = {
            Min: filters.LevelFilter?.Min && filters.LevelFilter?.Min >= this.DefaultMinLevel && filters.LevelFilter?.Min <= this.DefaultMaxLevel
                    ? filters.LevelFilter.Min : this.DefaultMinLevel,
            Max: filters.LevelFilter?.Max && filters.LevelFilter?.Max >= this.DefaultMinLevel && filters.LevelFilter?.Max <= this.DefaultMaxLevel
                    ? filters.LevelFilter.Max : this.DefaultMaxLevel
        }
        if (sanitizedLevelFilter.Min > sanitizedLevelFilter.Max) {
            let max = sanitizedLevelFilter.Min;
            sanitizedLevelFilter.Min = sanitizedLevelFilter.Max;
            sanitizedLevelFilter.Max = max;
        }

        const listUrl = new Url(this.ApiBaseUrl)
            .AppendPathSegment('list')
            .SetQueryParam('page', pageNumber.toString())
            .SetQueryParam('jobs', filters.ClassFilter?.join(','))
            .SetQueryParam('level', [
                sanitizedLevelFilter.Min,
                sanitizedLevelFilter.Max].join(','));

        const response = await fetch(listUrl.ToString(), {
            headers: {
                "X-Requested-With": "XMLHttpRequest",
            },
            method: "GET",
            mode: "cors"
        });

        return await response.json() as BuildList;
    }

    public async GetEnchants(buildId: number) {
        const enchantUrl = new Url(this.ApiBaseUrl)
            .AppendPathSegment('enchants')
            .AppendPathSegment(buildId.toString());

        const response = await fetch(enchantUrl.ToString(), {
            headers: {
                "X-Requested-With": "XMLHttpRequest",
            },
            method: "GET",
            mode: "cors"
        });

        return await response.json() as Enchants;
    }

    public async GetBuildDetails(buildId: string) {
        const buildUrl = new Url(this.ApiBaseUrl)
            .AppendPathSegment('build')
            .AppendPathSegment(buildId);

        const response = await fetch(buildUrl.ToString(), {
            headers: {
                "X-Requested-With": "XMLHttpRequest",
            },
            method: "GET",
            mode: "cors"
        });

        return await response.json() as BuildDetail;
    }

    public GetRedirectLink(build: Build): string {
        return new Url(this.BaseUrl).AppendPathSegment(build.link_build).ToString();
    }

    public GetItemImageFromGfxId(gfxId: string) {
        return new Url(this.ImageBaseUrl).AppendPathSegment(`${gfxId}.webp`).ToString();
    }

    public GetClassIcon(classId: string) {
        return new Url(this.ClassIconsBaseUrl).AppendPathSegment(`${classId}.webp`).ToString();
    }

    public GetSpellIcon(spellId: string) {
        return new Url(this.SpellIconsBaseUrl).AppendPathSegment(`${spellId}.webp`).ToString();
    }

    public GetBuildPictoFromName(pictoName: string) {
        return new Url(this.BuildPictosBaseUrl).AppendPathSegment(`${pictoName}.webp`).ToString();
    }
}

export const zenithWakfuService = new ZenithWakfuService()

export enum Class {
    Féca = 1,
    Osamodas = 2,
    Enutrof = 3,
    Sram = 4,
    Xélor = 5,
    Ecaflip = 6,
    Eniripsia = 7,
    Iop = 8,
    Crâ = 9,
    Sadida = 10,
    Sacrieur = 11,
    Panda = 12,
    Roublard = 13,
    Zobal = 14,
    Ouginak = 15,
    Steamer = 16,
    Eliotrope = 18,
    Huppermage = 19
}