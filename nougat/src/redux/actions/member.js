export const updateMember = (prop, data) => ({
  type: "UPDATE_MEMBER",
  payload: { [prop]: data },
});

export const getMember = (member) => ({
  type: "GET_MEMBER",
  payload: member,
});
