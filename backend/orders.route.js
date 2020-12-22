const router = require("express").Router();
let Order = require("./orders.model");

router.get("/", async (req, res) => {
    try {
        const allOrders = await Order.find()
        if (!allOrders) {
            res.status(400).json({"error": "no orders in db"})
        }
        res.status(200).json({message: "success!", allOrders})
    } catch (error) {
        console.log({"get error": error.message})
        res.status(500).json({"get error": error.message})
        
    }
});
router.get("/:id", async (req, res) => {
    try {
        const oneOrder = await Order.findOne({_id: req.params.id})
        if (!oneOrder) {
            res.status(400).json({"error" : "Order not found" });
        }
        res.status(200).json({message: "success!", oneOrder})
        
    } catch (error) {
        console.log({ "post err": error.message });
        res.status(500).json({ "post error": error.message });
    }
});
router.post("/", async (req, res) => {
    try {
        const {
          orderId,
          serviceNo,
          segment,
          productName,
          status,
          remark,
          state,
        } = req.body;
        console.log(req.body)
        if (!orderId || !serviceNo || !segment || !productName || !status) {
            return res
              .status(400)
              .json({ msg: "Not all fields have been entered." });
        }
        const existingOrder = await Order.findOne({orderId: orderId})
        if (existingOrder) {
            return res
              .status(400)
              .json({ msg: "Order already exist." });
        }
        const newOrder = new Order({
          orderId,
          serviceNo,
          segment,
          productName,
          status,
          remark,
          state,
        });
        const savedOrder = await newOrder.save()
        if (savedOrder != null) {
            res.status(200).json({message: "success!", savedOrder})
        }
        
    } catch (error) {
        console.log({ "post err": error.message });
        res.status(500).json({ "post error": error.message });
        
    }
});
router.put("/:id", async (req, res) => {
    try {
        const toUpdateOrder = await Order.findOne({ _id: req.params.id });
        const {
          orderId,
          serviceNo,
          segment,
          productName,
          status,
          remark,
          state,
        } = req.body;
        console.log(req.body)
        if (!orderId || !serviceNo || !segment || !productName || !status) {
          return res
            .status(400)
            .json({ msg: "Not all fields have been entered." });
        }
        await Order.findByIdAndUpdate(req.params.id, {
          orderId,
          serviceNo,
          segment,
          productName,
          status,
          remark,
          state,
        },
        {
            new:true
        },
        
    
        );
        res.status(200).json({"message" : "success"});
    } catch (error) {
        console.log({ "update err": error.message });
        res.status(500).json({ "update error": error.message });
    }
});
router.delete("/:id", async (req, res) => {
    try {
      const toDeleteOrder = await Order.findByIdAndDelete(req.params.id);
      console.log(toDeleteOrder)
      res.json(todDletedOrder);
    } catch (err) {
      console.log({ "delete err": error.message });
      res.status(500).json({ "delete error": error.message });
    }
});



module.exports = router;
