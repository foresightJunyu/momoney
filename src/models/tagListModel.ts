const localStorageKeyName = 'tagList';
type Tag = {
    id: string
    name: string
}
type TagListModel = {
    data: Tag[]
    fetch: () => Tag[]
    update: (id: string, name: string) => 'success' | 'not_found' | 'duplicated'
    create: (name: string) => 'success' | 'duplicated' // 联合类型
    save: () => void
    remove: (id: string) => boolean
}
const tagListModel: TagListModel = {
    data: [],
    fetch() {
        this.data = JSON.parse(window.localStorage.getItem('localStorageKeyName') || '[]');
        return this.data;
    },
    update(id, name) {
        const idList = this.data.map(item => item.id);
        if (idList.indexOf(id) >= 0) {
            const names = this.data.map(item => item.name);
            if (names.indexOf(name) >= 0) {
                return 'duplicated';
            } else {
                const tag = this.data.filter(item => item.id === id)[0];
                tag.name = name;
                tag.id = name;
                this.save();
                return 'success';
            }
        } else {
            return 'not_found';
        }
    },
    save() {
        window.localStorage.setItem('localStorageKeyName', JSON.stringify(this.data));
    },
    create(name) {
        const names = this.data.map(item => item.name);
        if (names.indexOf(name) >= 0) {
            return 'duplicated';
        }
        this.data.push({id: name, name: name});
        this.save();
        return 'success';
    },
    remove(id) {
        let index = -1;
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].id === id) {
                index = i;
                break;
            }
        }
        this.data.splice(index, 1);
        this.save();
        return true;
    }
};
export default tagListModel;
