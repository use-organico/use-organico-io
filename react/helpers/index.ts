export const getPureDataFromMasterData = (array: any[] = []) => {
    let pureDataFromMasterData: any[] = [];

    array?.forEach((arrayEl1: any) => {
        let jsonInternoTratado: any = {};

        arrayEl1?.fields?.forEach((arrayEl1Field: any) => {
            jsonInternoTratado[arrayEl1Field.key] = arrayEl1Field.value;
        });

        pureDataFromMasterData.push(jsonInternoTratado);
    });

    return pureDataFromMasterData;
};