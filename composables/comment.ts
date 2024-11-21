type Comment = {
  isComment: Ref<boolean | false>;
  commentNo: Ref<number | 0>;
  commentCount: Ref<number | 0>;
  setIsComment: (newIsComment: boolean | false) => void;
  setCommentNo: (newCommentNo: number | 0) => void;
  setCommentCount: () => void;
};

export const useComment = (): Comment => {
  const isComment = useState<boolean | false>("isComment", () => false);
  const commentNo = useState<number | 0>("commentNo", () => 0);
  const commentCount = useState<number | 0>("commentCount", () => 0);

  const setIsComment = (newIsComment: boolean | false) => {
    isComment.value = newIsComment;
  };
  const setCommentNo = (newCommentNo: number | 0) => {
    commentNo.value = newCommentNo;
  };
  const setCommentCount = () => {
    commentCount.value = commentCount.value + 1;
  };

  return {
    isComment,
    commentNo,
    commentCount,
    setIsComment,
    setCommentNo,
    setCommentCount
  };
};
