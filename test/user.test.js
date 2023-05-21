const user = artifacts.require('user');

contract('user', (accounts) => {

    let UserInstance;

    before(async () => {
        UserInstance = await user.new("0xa0daa9c951e695deea607a98376a83e7c3a23a14", "Devansh", "dgupta0069@gmail.com");
    })

    it('Should be able to tell if a user exists on the network', async () => {

        assert(UserInstance.userExists("0xa0daa9c951e695deea607a98376a83e7c3a23a14"), true, "User does not exist");

    })

    it('Should be able to return user address', async () => {
          
        const userAddress = await UserInstance.UserAddress;

        assert(userAddress, "0xa0daa9c951e695deea607a98376a83e7c3a23a14", "User address is not correct");
    })
 
    it('Should be able to add a user', async () => {

        const userToken = UserInstance.users[0xa0daa9c951e695deea607a98376a83e7c3a23a14];


        const result = {
           name: userToken[0],
           email: userToken[1],
           bookBalance: userToken[2],
           bookIssued: userToken[3]
        }


        assert(result.name, "Devansh", "Username is not correct");
        assert(result.email, "dgupta0069@gmail.com", "Email is incorrect");
    })
})