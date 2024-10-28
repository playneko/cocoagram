type Comment = {
  isComment: Ref<boolean | false>;
  commentIdx: Ref<number | 0>;
  setIsComment: (newIsComment: boolean | false) => void;
  setCommentIdx: (newCommentIdx: number | 0) => void;
};

export const useComment = (): Comment => {
  const isComment = useState<boolean | false>("isComment", () => false);
  const commentIdx = useState<number | 0>("commentIdx", () => 0);

  const setIsComment = (newIsComment: boolean | false) => {
    isComment.value = newIsComment;
  };
  const setCommentIdx = (newCommentIdx: number | 0) => {
    commentIdx.value = newCommentIdx;
  };

  return {
    isComment,
    commentIdx,
    setIsComment,
    setCommentIdx
  };
};
