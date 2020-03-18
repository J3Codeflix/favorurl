import { LinkStats } from "./linkStats.model";

export class Links {
    id: number;
    user_id: number;
    title: string;
    branded_domain: string;
    slash_tag: string;
    destination_url: string;
    clicks: number;
    created_at: string;
    updated_at: string;
    time_ago;
    link_stats: Array<LinkStats>;
}