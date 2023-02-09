import React, {FC, useRef, ChangeEvent, useState} from 'react';
import axios from 'axios';
import UploadList from './uploadList';
import Dragger from './draggle';
export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error';
export interface UploadFile {
    uid: string;
    size: number;
    name: string;
    status?: UploadFileStatus;
    percent: number;
    raw?: File;
    response?: any;
    error?: any;
}
export interface UploadProps {
    /**上传的地址 */
    action?: string;
    /**上传的文件列表,*/
    defaultFileList?: UploadFile[];
    /**上传文件之前的钩子，参数为上传的文件，若返回 false 则停止上传。 */
    beforeUpload?: (file: File) => boolean | Promise<File>;
    /**文件上传时的钩子 */
    onProgress?: (percentage: number, file: UploadFile) => void;
    /**文件上传成功时的钩子 */
    onSuccess?: (data: any, file: UploadFile) => void;
    /**文件上传失败时的钩子 */
    onError?: (err: any, file: UploadFile) => void;
    /**文件状态改变时的钩子，上传成功或者失败时都会被调用	 */
    onChange?: (file: UploadFile) => void;
    /**文件列表移除文件时的钩子 */
    onRemove?: (file: UploadFile) => void;
    /**设置上传的请求头部 */
    headers?: {[key: string]: any};
    /**上传的文件字段名 */
    name?: string;
    /**上传时附带的额外参数 */
    data?: {[key: string]: any};
    /**支持发送 cookie 凭证信息 */
    withCredentials?: boolean;
    /**可选参数, 接受上传的文件类型 */
    accept?: string;
    /**是否支持多选文件 */
    multiple?: boolean;
    /**是否支持拖拽上传 */
    drag?: boolean;
    children?: React.ReactNode;
}

/**
 * 通过点击或者拖拽上传文件
 * ### 引用方法
 *
 * ~~~js
 * import { Upload } from 'river-design'
 * ~~~
 */
export const Upload: FC<UploadProps> = props => {
    const {
        action,
        defaultFileList,
        beforeUpload,
        onProgress,
        onSuccess,
        onError,
        onChange,
        onRemove,
        name,
        headers,
        data,
        withCredentials,
        accept,
        multiple,
        children,
        drag,
    } = props;

    const fileInput = useRef<HTMLInputElement>(null);

    //用于存储要上传的文件
    const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || []);

    //更新上传文件列表的文件信息
    const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
        setFileList(prevList => {
            return prevList.map(file => {
                if (file.uid === updateFile.uid) {
                    return {...file, ...updateObj};
                } else {
                    return file;
                }
            });
        });
    };
    const handleClick = () => {
        if (fileInput.current) {
            fileInput.current.click();
        }
    };
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) {
            return;
        }
        uploadFiles(files);
        if (fileInput.current) {
            fileInput.current.value = '';
        }
    };
    const handleRemove = (file: UploadFile) => {
        setFileList(prevList => {
            return prevList.filter(item => item.uid !== file.uid);
        });
        if (onRemove) {
            onRemove(file);
        }
    };
    const uploadFiles = (files: FileList, test?: boolean) => {
        let postFiles = Array.from(files);
        if (test) {
            console.log('drag', postFiles[0]);
        }
        postFiles.forEach(file => {
            //如果没有传入beforeUpload钩子函数，就直接上传
            if (!beforeUpload) {
                post(file);
            } else {
                //获取beforeUpload钩子函数返回的文件，并上传该文件
                const result = beforeUpload(file);
                if (result && result instanceof Promise) {
                    result.then(processedFile => {
                        post(processedFile);
                    });
                } else if (result !== false) {
                    post(file);
                }
            }
        });
    };
    const post = (file: File) => {
        //没有目标地址则不执行上传
        if (!action) return;

        //记录文件信息
        let _file: UploadFile = {
            uid: Date.now() + 'upload-file',
            status: 'ready',
            name: file.name,
            size: file.size,
            percent: 0,
            raw: file,
        };
        //加入到文件列表中
        setFileList(prevList => {
            return [_file, ...prevList];
        });

        //将文件加入到formData中
        const formData = new FormData();
        //name:上传的文件字段名
        formData.append(name || 'file', file);
        //data:上传时附带的额外参数
        if (data) {
            Object.keys(data).forEach(key => {
                formData.append(key, data[key]);
            });
        }
        //使用axios实现上传
        axios
            .post(action, formData, {
                //修改请求头，设置Content-Type为文件格式
                headers: {
                    ...headers,
                    'Content-Type': 'multipart/form-data',
                },
                //设置跨域请求携带cookie
                withCredentials,
                //记录上传进度
                onUploadProgress: e => {
                    if (e.total) {
                        let percentage = Math.round((e.loaded * 100) / e.total) || 0;
                        if (percentage < 100) {
                            //更新上传文件列表的文件的进度、状态，
                            updateFileList(_file, {percent: percentage, status: 'uploading'});
                            _file.status = 'uploading';
                            _file.percent = percentage;
                            if (onProgress) {
                                //触发正在上传生命周期钩子函数
                                onProgress(percentage, _file);
                            }
                        }
                    }
                },
            })
            .then(resp => {
                //更新上传文件列表的文件的值和状态
                updateFileList(_file, {status: 'success', response: resp.data});
                _file.status = 'success';
                _file.response = resp.data;
                //触发上传成功生命周期函数
                if (onSuccess) {
                    onSuccess(resp.data, _file);
                }
                //触发文件状态改变时的钩子，上传成功或者失败时都会被调用
                if (onChange) {
                    onChange(_file);
                }
            })
            .catch(err => {
                //更新上传文件列表的文件的错误信息和状态
                updateFileList(_file, {status: 'error', error: err});
                _file.status = 'error';
                _file.error = err;
                //触发文件上传失败时的钩子
                if (onError) {
                    onError(err, _file);
                }
                //触发文件状态改变时的钩子，上传成功或者失败时都会被调用
                if (onChange) {
                    onChange(_file);
                }
            });
    };

    return (
        <div className="river-upload-component">
            <div className="river-upload-input" style={{display: 'inline-block'}} onClick={handleClick}>
                {drag ? (
                    <Dragger
                        onFile={files => {
                            uploadFiles(files, true);
                        }}>
                        {children}
                    </Dragger>
                ) : (
                    children
                )}
                <input
                    className="river-file-input"
                    style={{display: 'none'}}
                    ref={fileInput}
                    onChange={handleFileChange}
                    type="file"
                    accept={accept}
                    multiple={multiple}
                />
            </div>

            <UploadList fileList={fileList} onRemove={handleRemove} />
        </div>
    );
};

Upload.defaultProps = {
    name: 'file',
};
export default Upload;
