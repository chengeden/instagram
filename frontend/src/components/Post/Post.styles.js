import styled from "styled-components";

export const Container = styled.div`
  width: 45%;
`;

export const UserPost = styled.div`
  width: 100%;
  margin: 20px 0 20px 200px;
  border: 1px solid hsl(147, 7%, 75%);
  font-size: 14px;
 
  a,
  .user {
    text-decoration: none;
    color: black;
    font-weight: bold;
    margin-right: 5px;
    cursor: pointer;
 
    &:hover {
      text-decoration: underline;
    }
  }
 
  svg {
    cursor: pointer;
    margin-right: 7px;
    color: #2f2d2d;
    transition: transform 0.2s;
 
    &:hover {
      transform: scale(1.1);
    }
  }
 
  @media (max-width: 768px) {
    margin: 0 0 20px;
    font-size: 12px;
    width: 100%;
  }
`;

export const UserInfo = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;
 
  .post-info {
    display: flex;
    justify-content: center;
    align-items: center;
 
    img {
      width: 45px;
      height: 45px;
      border-radius: 50%;
    }
 
    .icon {
      margin-right: 10px;
    }
  }
`;

export const Media = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
 
  svg {
    position: absolute;
    background: transparent;
    color: tomato;
    transform: scale(0);
    opacity: 0;
    font-size: 100px;
    transition: all 0.2s ease-in;
  }
 
  svg.active {
    transform: scale(1);
    opacity: 1;
  }
 
  img {
    width: 100%;
  }
`;

export const PostInfo = styled.div`
  margin: 5px 10px;
`;

export const PostActionIcons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
 
  .like-icon.liked {
    color: tomato;
  }
`;

export const Likes = styled.p`
  font-weight: bold;
  margin: 5px 0;
`;

export const Caption = styled.section`
  .hideContent {
    overflow: hidden;
    height: 1.3em;
  }
  .showContent {
    line-height: auto;
    height: auto;
  }
`;

export const Comments = styled.div`
  overflow-y: scroll;
  margin: 10px 0;
  li {
    list-style: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    div {
      display: flex;
    }
  }
 
  .empty-comment-box {
    color: grey;
  }
`;

export const CommentInput = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid hsl(147, 7%, 75%);
  padding: 8px 0;
 
  form,
  input {
    border: none;
    outline: none;
    font-size: 15px;
    width: 100%;
  }
 
  a {
    margin: 0 10px;
    font-size: 15px;
    font-weight: bold;
    color: royalblue;
    text-decoration: none;
  }
`;