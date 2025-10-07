export interface IBlog{
_id:string
title:string;
description: string;
tags:string[];
author:string;
image:string;
}

export interface IProject {
    _id:string;
    title:string;
    technology: string[];
    description:string;
    image:string;
    live_link?:string;
    Github_Link?: string;
}