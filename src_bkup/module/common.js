const maxInDictList = (dictList, key) => {
    if(dictList.length == 0) {
        return 0;
    }
    return Math.max(...dictList.map(item=>item[key]));
}

const comm = {
    maxInDictList: maxInDictList,
};

export default comm;