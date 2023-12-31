import { Member, CreateMember } from "../types/member.interface";
import { api, deleteImageApi, uploadApi } from "./api.service";

/**
 * 맴버 조회
 */
export const getMembers = async (): Promise<Member[]> => {
  const res: Member[] = await api("GET", "member");

  return res;
};

/**
 * 맴버 추가
 * @param {MemberWithoutId} memberInfo - 맴버의 name, position 값이 필요합니다. imageUrl 값은 필수가 아닙니다.
 */
export const createMember = async (
  memberInfo: CreateMember
): Promise<Member> => {
  const { imageUrl } = memberInfo;

  if (!imageUrl) {
    const defaultImageUrl =
      process.env.REACT_APP_DEFAULT_IMAGE_URL ||
      "https://static.vecteezy.com/system/resources/previews/013/042/571/non_2x/default-avatar-profile-icon-social-media-user-photo-in-flat-style-vector.jpg";

    memberInfo.imageUrl = defaultImageUrl;
  }

  const res: Member = await api("POST", "member", memberInfo);

  return res;
};

/**
 * 맴버 수정
 * @param {Member} member - 삭제하려는 맴버의 정보가 필요합니다.
 * @param {string} image - 이미지 수정 시 새롭게 업로드한 이미지 값이 필요합니다.
 */
export const updateMember = async (
  member: Member,
  image?: string
): Promise<Member | undefined> => {
  // 이전 사진 삭제

  if (image) {
    const { imageUrl } = member;
    const isNotDefaultImage = !isDefaultImage(imageUrl);

    if (isNotDefaultImage) {
      const result = await deleteImageApi([imageUrl]);
      if (!result.ok) {
        window.alert("문제가 생겼습니다. 잠시 후 다시 시도하세요.");
        return;
      }
    }

    member.imageUrl = image;
  }

  const { id } = member;

  // 정보 수정
  const data = await api("PUT", `member/${id}`, member);

  return data;
};

/**
 * 맴버 프로필 이미지 업로드.
 *
 * @param {File} file - 업로드 하려는 이미지 파일이 필요합니다.
 */
export const uploadProfileImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("image", file);

  const res = await uploadApi(formData);

  return res.path;
};

/**
 * 맴버 삭제
 * @param {Member} member - 삭제하려는 맴버의 정보가 필요합니다.
 */
export const deleteMember = async (member: Member): Promise<boolean> => {
  const { id, imageUrl } = member;

  const isNotDefaultImage = !isDefaultImage(imageUrl);

  if (isNotDefaultImage) {
    const result = await deleteImageApi([imageUrl]);
    if (!result.ok) {
      window.alert("문제가 생겼습니다. 잠시 후 다시 시도하세요.");
      return false;
    }
  }

  const res = await api("DELETE", `member/${id}`);

  return res ? true : false;
};

const isDefaultImage = (imageUrl: string): boolean => {
  const defaultImageUrl =
    process.env.REACT_APP_DEFAULT_IMAGE_URL ||
    "https://static.vecteezy.com/system/resources/previews/013/042/571/non_2x/default-avatar-profile-icon-social-media-user-photo-in-flat-style-vector.jpg";

  return imageUrl == defaultImageUrl;
};
