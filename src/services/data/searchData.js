export const searchData = (value, items) => {
    if (value.val.trim().length === 0) {
        return items;
    }

    return items.filter((item) => {
        if (item.title.toLowerCase().indexOf(value.val.toLowerCase().trim()) > -1) {
            return true;
        }
    });

};