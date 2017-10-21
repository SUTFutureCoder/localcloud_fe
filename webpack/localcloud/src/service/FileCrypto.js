/**
 * Created by lin on 17-10-19.
 *
 * 文件hash SHA
 *
 * 感谢以下代码提供者
 *
 * window.crypto提供文件SHA1 SHA256 SHA384 SHA512
 * 兼容分片模式提供MD5及以上支持
 *
 * (c) 2011,2015 by md5file.com. All rights reserved.
 * (c) https://github.com/GakkiiSmile/g/blob/bae5b63821c989b985e90ccc360094b834cece95/src/components/main/upload_test.vue
 *
 */
import Vue from './../assets/EventBus'

export default {
    
    sha512File: function (file) {
        let is_crypto = window.crypto && window.crypto.subtle && window.crypto.subtle.digest
        if (!is_crypto) {
            alert('请使用最新版chrome或firefox进行上传')
            return false
        }

        let reader = new FileReader()
        reader.onprogress = (function() {
        })()
        reader.onload = () => {
            //对文件进行HASH
            window.crypto.subtle.digest({name: 'SHA-512'}, reader.result)
                .then((hash) => {
                    let hex_string = '', hash_result = new Uint8Array(hash)
                    for (let i = 0; i < hash_result.length; i++) {
                        hex_string += ("00" + hash_result[i].toString(16)).slice(-2)
                    }
                    this.markFileHash(file, hex_string)
                })
                .catch(function (error) {
                    console.log(error)
                })
        }
        reader.readAsArrayBuffer(file)
    },
    //找到文件并打hash标记
    markFileHash: function (file, hex_string) {
        for (let i in Vue.GLOBAL.transform_upload) {
            if (file.name_hash == Vue.GLOBAL.transform_upload[i].name_hash) {
                //进行打hash
                Vue.GLOBAL.transform_upload[i].hash = hex_string
                return true
            }
        }
        return false
    },
    //用于计算文件分片的hash
    sha512Slice: function (file) {
        let is_crypto = window.crypto && window.crypto.subtle && window.crypto.subtle.digest
        if (!is_crypto) {
            alert('请使用最新版chrome或firefox进行上传')
            return false
        }

        //不要存blob
        for (let s = 0; s < file.upload_task.slice_sum; s++) {
            let file_slice_blob = file.slice(file.upload_task.slice_trunk * s, file.upload_task.slice_trunk * (s + 1))
            //开始计算
            let reader =new FileReader()
            reader.onprogress = (function() {
            })()
            reader.onload = () => {
                //对文件进行HASH
                window.crypto.subtle.digest({name: 'SHA-512'}, reader.result)
                    .then((hash) => {
                        let hex_string = '', hash_result = new Uint8Array(hash)
                        for (let i = 0; i < hash_result.length; i++) {
                            hex_string += ("00" + hash_result[i].toString(16)).slice(-2)
                        }
                        //注意时序会乱
                        this.markSliceHash(file, s, hex_string)
                    })
                    .catch(function (error) {
                        console.log(error)
                    })
            }
            reader.readAsArrayBuffer(file_slice_blob)
        }
    },
    //找到文件并打分片标记
    markSliceHash: function (file, slice, hex_string) {
        for (let i in Vue.GLOBAL.transform_upload) {
            if (file.name_hash == Vue.GLOBAL.transform_upload[i].name_hash) {
                //进行打hash
                if (undefined == Vue.GLOBAL.transform_upload[i].slice_hash) {
                    Vue.GLOBAL.transform_upload[i].slice_hash = []
                }
                Vue.GLOBAL.transform_upload[i].slice_hash[slice] = hex_string
                return true
            }
        }
        return false
    }
}

