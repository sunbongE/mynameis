import { reportUser } from '../apis/services/user/user';

/**
 * 녹화파일 전송하는 메소드
 * @param recordingFile
 */
export const sendRecordingFile = async (recordingFile: File) => {
  console.log('recordingFile', recordingFile);
  const fData = new FormData(); // formData 변환
  fData.append('file', recordingFile);
  fData.append('roomId', '1');
  fData.append('reporterId', '');
  fData.append('reportedId', '');
  fData.append('reportType', '욕설');

  console.log('전송할 데이터 params', fData);
  const data = await reportUser(fData);
  console.log('녹화 파일 전송 결과', data);
};

/**
 * blob 데이터 파일로 변환하는 메소드
 * @param blob
 * @param fileName
 * @returns
 */
export const blobToFile = (blob: Blob, fileName: string) => {
  const file = new File([blob], fileName, { type: blob.type });
  return file;
};
