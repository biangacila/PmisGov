import storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';

 const InitStorage=()=>{
    var storage = new storage({
        // maximum capacity, default 1000
        size: 1000,

        // Use AsyncStorage for RN apps, or window.localStorage for web apps.
        // If storageBackend is not set, data will be lost after reload.
        storageBackend: AsyncStorage, // for web: window.localStorage

        // expire time, default: 1 day (1000 * 3600 * 24 milliseconds).
        // can be null, which means never expire.
        defaultExpires: 1000 * 3600 * 24,

        // cache data in the memory. default is true.
        enableCache: true,

        // if data was not found in storage or expired data was found,
        // the corresponding sync method will be invoked returning
        // the latest data.
        sync : {
            // we'll talk about the details later.
        }
    })
}

 const loadFromStorage = ( key) => {
    return storage.load({
        key,
        // autoSync(default true) means if data not found or expired,
        // then invoke the corresponding sync method
        autoSync:true, // syncInBackground(default true) means if data expired,
        // return the outdated data first while invoke the sync method.
        // It can be set to false to always return data provided by    sync method when expired.(Of course it's slower)
        syncInBackground:true
    })
        .then(ret => {
            console.log(ret)
            return({
                type: 'success',
                item: ret
            })
        })
        .catch(err => {
            console.log(err.message);
            return({
                type: 'error',
                error: err
            })
        })
}

 const removeFromStorage = ( key) =>{
    storage.remove({
        key
    });
}

 const saveToStorage = ( key, data) => {
    storage.save({
        key,   //   Note: Do not use underscore("_") in key!
        data
    });
}

export {InitStorage,loadFromStorage,removeFromStorage,saveToStorage};