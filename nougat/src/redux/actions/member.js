export const updateMember = (member) => ({
  type: "UPDATE_MEMBER",
  payload: member,
});

export const getMember = (member) => ({
  type: "GET_MEMBER",
  payload: member,
});
