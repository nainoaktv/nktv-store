import CommonModal from "../CommonModal";

export default function CartModal() {
  return (
    <CommonModal
      showButtons={true}
      buttonComponent={
        <Fragment>
          <button>Go To Cart</button>
          <button>Checkout</button>
        </Fragment>
      }
    />
  );
}
