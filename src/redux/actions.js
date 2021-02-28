
export function loginUserSuccess (content) {
  return {
    type: 'LOGIN',
    payload: {
      tokenId: content.tokenId,
    }
  }
}