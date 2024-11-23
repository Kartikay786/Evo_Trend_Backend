import Cart from '../models/cart.model.js'

// add cart item
//delte item

const addItem = async (req, res) => {
    const { productId, quantity } = req.body;

    try {
        let cart = await Cart.findOne({ userId: req.user.id });

        if (!cart) {
            cart = new Cart({ userId: req.user.id, items: [] });
            console.log(cart);
            // return res.status(200).json({message:'Cart created'});
        }

        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;

        }
        else {
            cart.items.push({ productId, quantity });
        }

        await cart.save();
        return res.status(200).json({ message: 'Item added in cart' });

    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Server Error' })
    }

}


// get all cart item
const getcartItem = async (req, res) => {

    try {
        const cart = await Cart.findOne({ userId: req.user.id });

        if (!cart) return res.status(400).json({ message: 'your cart is empty' });

        return res.status(200).json({ message: 'Your added item', cart });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'server error' });
    }
}

//delete item of cart
const deleteItem = async (req, res) => {
    const productId = req.params.id;

    try {
        const cart = await Cart.findOne({ userId: req.user.id });

        if (!cart) return res.status(400).json({ message: 'your cart is empty' });
        console.log(cart._id);

        // find item index
        const itemIndex = cart.items.findIndex(item => item.productId.toString() == productId);
        // if (!itemIndex) return res.status(400).json({ message: 'No item found with this id' });

        //find item on index
        const item = cart.items[itemIndex];
        console.log(item);
        
        await item.deleteOne();

        return res.status(200).json({ message: 'Item deleted' });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'server error' });
    }
}

export { addItem, getcartItem, deleteItem };