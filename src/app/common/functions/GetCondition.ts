import { Condition } from "../enum/condition";

export function getCondition(key: Condition) {
    if (key === Condition.NEW) {
        return "Mới";
    }
    if (key === Condition.LIKENEW) {
        return "Hàng 99%";
    }
    if (key === Condition.USED) {
        return "Đã sử dụng"
    }
    return ""
}