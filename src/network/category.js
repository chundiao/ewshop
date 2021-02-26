import {request} from "@/network/request";

export function getCategory() {
    return request({
        url: '/api/goods'
    })
}

export function getGoods(order='', cid=0, page=1) {
    return request({
        url: `/api/goods?${order}=1&category_id=${cid}&page=${page}`
    })
}